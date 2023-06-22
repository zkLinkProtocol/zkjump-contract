import "@nomicfoundation/hardhat-toolbox";

import { HardhatUserConfig } from "hardhat/config";
import env from "./etc/env";

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
};
env.forEach((network) => {
    config.networks[network.chainId.toString()] = {
        url: network.web3Url,
        accounts: [
            "0x354bd1e4d7f7cf3751e8bca54df987646e017695c5ba33897c34026450cb91bd", //0xc7D9CD7cC37671526a4F1cD46280F7110db86D7e
        ],
    };
});
export default config;

// // import these packages if network is zksync
// if (netConfig.network.zksync !== undefined && netConfig.network.zksync) {
//   require("@matterlabs/hardhat-zksync-solc");
//   require("@matterlabs/hardhat-zksync-verify");

//   hardhatUserConfig.zksolc = {
//     version: "1.3.8",
//     compilerSource: "binary",
//     settings: {}
//   };
// }
