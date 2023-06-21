import { Command, Option } from "commander";
import { JSONRPCClient } from "json-rpc-2.0";
import fetch from "node-fetch";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { format } from "prettier";
import { ethers } from "hardhat";
// import * as AsciiTable from "ascii-table";

import __env from "../etc/env";
const env: Record<string, any> = {};
__env.forEach((item) => {
    env[item.chainId.toString()] = item;
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const program = new Command();
program.version("0.0.1");

let networkIdOption = new Option(
    "-i, --network-id <networkId>",
    "Network ID"
).choices(["1", "2", "..."]);
let envNameOption = new Option("-e, --env-name <envName>", "Env Name").choices([
    "mainnet",
    "devnet",
    "testnet",
]);
let contractNameOption = new Option(
    "-c, --contract-name <contractName>",
    "Contract Name"
).choices(["ZkJumpETH", "ZkJumpERC20"]);
let tokenContractAddressOption = new Option(
    "-t, --token-contract-address <tokenContractAddress>",
    "ERC20 Token Contract Address"
);

let ENV_INFO_URL = {
    devnet: "https://dev-gw-v1.zk.link",
};
program
    .command("init")
    .addOption(envNameOption)
    .action(async (options) => {
        await init(options.envName);
    });

program
    .command("deploy")
    .addOption(networkIdOption)
    .addOption(contractNameOption)
    .addOption(tokenContractAddressOption)
    .requiredOption("-g, --gas-token <gasToken>", "Gas Fee Manage")
    .action(async (options) => {
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
program.parse();

async function deployZkJumpETH(networkId: string) {
    let envInstance = env[networkId];
    if (envInstance !== undefined) {
        throw new Error("networkId is not exist");
    }
    const ZkJumpETH = await ethers.deployContract("ZkJumpETH", [
        envInstance.mainContract,
    ]);
    await ZkJumpETH.waitForDeployment();
    let gasFeeManageAddrss = await ZkJumpETH.getAddress();
    console.log(gasFeeManageAddrss);
    // var table = new AsciiTable();
    // table.setHeading("Contract Name", "Contract Address", "ChainID");
    // table.addRow("ZkJumpETH", gasFeeManageAddrss, envInstance.layerOneChainId);
    // console.log(table.toString());
}

async function deployZkJumpERC20(
    networkId: string,
    gasToken: string,
    tokenContractAddress: string
) {
    let envInstance = env[networkId];
    if (envInstance !== undefined) {
        throw new Error("networkId is not exist");
    }
    const ZkJumpERC20 = await ethers.deployContract("ZkJumpERC20", [
        tokenContractAddress,
        gasToken,
        envInstance.mainContract,
    ]);
    await ZkJumpERC20.waitForDeployment();
    let erc20TokenJump = await ZkJumpERC20.getAddress();
    console.log(erc20TokenJump);
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
    writeFileSync(
        join(dirname(__dirname), "etc/env.ts"),
        format("export default " + JSON.stringify(result), {
            semi: false,
            parser: "babel",
        }),
        {
            encoding: "utf8",
            flag: "w",
        }
    );
}
