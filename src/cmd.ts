import { Command, Option } from "commander";
import { JSONRPCClient } from "json-rpc-2.0";
import fetch from "node-fetch";
import { writeFileSync } from "node:fs";
import { dirname, join } from "path";
import { format } from "prettier";
import AsciiTable from "ascii-table";

import env from "../etc/env";
{
    const args = process.argv.slice(2);
    const deployIndex = args.indexOf("deploy");
    const iIndex = Math.max(args.indexOf("-i"), args.indexOf("--network-id"));
    if (deployIndex !== -1 && iIndex !== -1) {
        const networkId: string = args[iIndex + 1];
        if (!env[networkId]) {
            throw new Error("unknow networkID");
        } else {
            process.env["HARDHAT_NETWORK"] = networkId;
        }
    }
}
// !! The import of Hardhat must occur after the HARDHAT_NETWORK setting is configured.
import hre from "hardhat";
import {
    Provider as ZksyncProvider,
    Wallet as ZksyncWallet,
} from "zksync-web3";
import { Deployer as ZksyncDeployer } from "@matterlabs/hardhat-zksync-deploy";

const program = new Command();
program.version("0.0.1");
let networkIdOption = new Option(
    "-i, --network-id <networkId>",
    "Network ID"
).choices(Object.keys(env));
networkIdOption.mandatory = true;

let envNameOption = new Option("-e, --env-name <envName>", "Env Name").choices([
    "mainnet",
    "devnet",
    "testnet",
]);
envNameOption.mandatory = true;

let contractNameOption = new Option(
    "-c, --contract-name <contractName>",
    "Contract Name"
).choices(["ZkJumpETH", "ZkJumpERC20"]);
contractNameOption.mandatory = true;

let compileOption = new Option(
    "-p, --compile <Compile>",
    "Whether to compile the smart contract, compile by default."
).choices(["true", "false"]);
compileOption.default(true);
compileOption.argParser((v) => v === "true");

let ENV_INFO_URL = {
    devnet: "https://dev-gw-v1.zk.link",
    mainnet: ""
};
program
    .command("init")
    .description("")
    .addOption(envNameOption)
    .action(async (options) => {
        await init(options.envName);
    });

program
    .command("deploy")
    .addOption(networkIdOption)
    .addOption(contractNameOption)
    .addOption(
        new Option(
            "-t, --token-contract-address <tokenContractAddress>",
            "ERC20 Token Contract Address"
        )
    )
    .addOption(
        new Option("-g, --gas-token <gasToken>", "Gas Fee Manage Contract")
    )
    .addOption(compileOption)
    .action(async (options) => {
        !!options.compile && (await hre.run("compile"));

        if (options.contractName == "ZkJumpETH") {
            await deployZkJumpETH(options.networkId);
        } else if (options.contractName == "ZkJumpERC20") {
            await deployZkJumpERC20(
                options.networkId,
                options.gasToken,
                options.tokenContractAddress
            );
        }
    });

program
    .command("deploy_multicall")
    .addOption(networkIdOption)
    .addOption(compileOption)
    .action(async (options) => {
        !!options.compile && (await hre.run("compile"));

        await deployMulticall(options.networkId);
    });
program.parse();

async function deployZkSync(
    contractName: string,
    params: any[],
    networkId: string
): Promise<string> {
    const zksyncProvider = new ZksyncProvider(
        hre.config.networks[networkId]["url"]
    );
    const zksyncWallet = new ZksyncWallet(
        hre.config.networks[networkId].accounts[0],
        zksyncProvider
    );
    hre.artifacts.readArtifact;
    const deployer = new ZksyncDeployer(hre, zksyncWallet);
    const artifact = await deployer.loadArtifact(contractName);

    const deploy = await deployer.deploy(artifact, params);
    await deploy.deployed();
    return deploy.address;
}
async function deployEvm(
    contractName: string,
    params: any[],
    networkId: string
): Promise<string> {
    let provider = new hre.ethers.providers.JsonRpcProvider(
        hre.config.networks[networkId]["url"]
    );

    const wallet = new hre.ethers.Wallet(
        hre.config.networks[networkId].accounts[0],
        provider
    );

    const signer = wallet.connect(provider);

    const deploy = await hre.ethers.deployContract(
        contractName,
        params,
        signer
    );
    return (await deploy.deployed()).address;
}
async function deployZkJumpETH(networkId: string) {
    let envInstance = env[networkId];
    if (envInstance == undefined) {
        throw new Error("networkId is not exist");
    }
    const deploy = hre.config.networks[networkId]["zksync"]
        ? deployZkSync
        : deployEvm;
    let ZkJumpETHAddress = await deploy(
        "ZkJumpETH",
        [envInstance.mainContract],
        networkId
    );
    var table = new AsciiTable();
    table.setHeading("Contract Name", "Contract Address", "ChainID");
    table.addRow("ZkJumpETH", ZkJumpETHAddress, envInstance.layerOneChainId);
    console.log(table.toString());
}

async function deployZkJumpERC20(
    networkId: string,
    gasToken: string,
    tokenContractAddress: string
) {
    let envInstance = env[networkId];
    if (envInstance === undefined) {
        throw new Error("networkId is not exist");
    }
    const deploy = hre.config.networks[networkId]["zksync"]
        ? deployZkSync
        : deployEvm;
    const ZkJumpERC20Address = await deploy(
        "ZkJumpERC20",
        [tokenContractAddress, gasToken, envInstance.mainContract],
        networkId
    );

    var table = new AsciiTable();
    table.setHeading("Contract Name", "Contract Address", "ChainID");
    table.addRow(
        "ZkJumpERC20",
        ZkJumpERC20Address,
        envInstance.layerOneChainId
    );
    console.log(table.toString());
}

async function deployMulticall(networkId: string) {
    let envInstance = env[networkId];
    if (envInstance == undefined) {
        throw new Error("networkId is not exist");
    }
    const deploy = hre.config.networks[networkId]["zksync"]
        ? deployZkSync
        : deployEvm;
    let MulticallAddress = await deploy(
        "Multicall",
        [],
        networkId
    );
    var table = new AsciiTable();
    table.setHeading("Contract Name", "Contract Address", "ChainID");
    table.addRow("Multicall", MulticallAddress, envInstance.layerOneChainId);
    console.log(table.toString());
}

async function init(envName: string) {
    let url = ENV_INFO_URL[envName];
    if (!url) {
        return Promise.reject(new Error("unknown env name : " + envName));
    }
    const client = new JSONRPCClient((jsonRPCRequest) =>
        fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(jsonRPCRequest),
        }).then((response) => {
            if (response.status === 200) {
                return response
                    .json()
                    .then((jsonRPCResponse) => client.receive(jsonRPCResponse));
            } else if (jsonRPCRequest.id !== undefined) {
                return Promise.reject(new Error(response.statusText));
            }
        })
    );

    let result = await client.request("getSupportChains", []);
    const env: Record<string, any> = {};
    result.forEach((item) => {
        env[item.chainId.toString()] = item;
    });
    writeFileSync(
        join(dirname(__dirname), "etc/env.ts"),
        format("export default " + JSON.stringify(env), {
            semi: false,
            parser: "babel",
        }),
        {
            encoding: "utf8",
            flag: "w",
        }
    );
}
