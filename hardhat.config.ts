import "@nomicfoundation/hardhat-toolbox";

import { HardhatUserConfig } from "hardhat/config";
import env from "./etc/env";
import "@matterlabs/hardhat-zksync-solc";
import accounts from "./etc/.secret";
const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            {
                version: "0.8.18",
                settings: {
                    viaIR: true,
                    optimizer: {
                        enabled: true,
                        runs: 100,
                    },
                },
            },
            {
                version: "0.7.6",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 800,
                    },
                },
            },
        ],
    },
    networks: {
        hardhat: {
            allowUnlimitedContractSize: true,
        },
    },
    zksolc: {
        version: "latest",
        compilerSource: "binary",
        settings: {
            libraries: {}, // optional. References to non-inlinable libraries
            isSystem: false, // optional.  Enables Yul instructions available only for zkSync system contracts and libraries
            forceEvmla: false, // optional. Falls back to EVM legacy assembly if there is a bug with Yul
            optimizer: {
                enabled: true, // optional. True by default
                mode: "3", // optional. 3 by default, z to optimize bytecode size
            },
        },
    },
};
Object.values(env).map((network) => {
    config.networks[network.chainId.toString()] = {
        url: network.web3Url,
        accounts,
        zksync: false,
    };
    // This is the only place that depends on the literal input "5"
    if (network.chainId.toString() == "5") {
        config.networks["5"]["ethNetwork"] = "goerli";
        config.networks["5"]["zksync"] = true;
    }
    if ([59144, 42161, 137, 80001].includes(Number(network.layerOneChainId))) {
        config.networks[network.chainId.toString()]["overrides"] = {
            type: 0,
            gasPrice: 5000000000
        }
    }
});
export default config;
