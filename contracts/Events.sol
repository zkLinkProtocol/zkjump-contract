// SPDX-License-Identifier: MIT OR Apache-2.0

pragma solidity ^0.8.0;

interface Events {
    event BridgeEvent(
        address brokerAddress,
        bytes32 userAddress,
        uint8 chainId,
        uint128 amount,
        uint128 fee,
        bool isEthFee
    );
}
