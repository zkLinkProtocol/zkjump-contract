# zkJump Project

The zkJump project is a decentralized bridge platform that allows users to transfer ERC20 tokens and Ether (ETH) between different chains using the zkLink protocol. It enables seamless interoperability and facilitates asset movement across various blockchain networks.

## config

First, create a ./etc/.secret.ts file that contains the private key.

```bash
touch ./etc/.secret.ts
```

The content of ./etc/.secret.ts

```javascript
export default ["<your private key>"];
```

## Overview

The zkJump project consists of a smart contract named `ZkJump`, which serves as the core component of the bridge infrastructure. It provides functionalities for bridging ERC20 tokens and Ether between chains by utilizing the zkLink protocol.

The `ZkJump` contract is implemented with features such as role-based access control, reentrancy guard. It supports the deposit and withdrawal of ERC20 tokens and ETH, ensuring secure and efficient cross-chain transfers.

## Key Features

-   **Bridge ERC20 Tokens:** Users can bridge ERC20 tokens from one chain to another using the `bridgeERC20` function provided by the `ZkJump` contract. The function verifies various parameters, including token amounts, deadlines, and signatures, to ensure the validity of the bridge operation.

-   **Bridge Ether (ETH):** The `bridgeETH` function enables users to bridge Ether (ETH) between chains. It validates the amount of ETH being bridged, the deadline time, and the broker's signature to ensure secure and reliable transfers.

-   **Role-based Access Control:** The `ZkJump` contract implements role-based access control, allowing the assignment of specific roles to designated accounts. The `grantBroker` function grants the broker role to an account, providing them with the necessary permissions to perform bridge operations.
