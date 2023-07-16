//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Multicall {
    struct Result {
        bool success;
        bytes returnData;
    }

    function multiStaticCall(
        address[] memory targets,
        bytes[] memory calls
    ) external view returns (uint256 blockNumber, Result[] memory returnData) {
        blockNumber = block.number;
        returnData = new Result[](calls.length);
        for (uint16 i = 0; i < calls.length; i++) {
            (bool success, bytes memory ret) = targets[i].staticcall(calls[i]);
            returnData[i] = Result(success, ret);
        }
    }
}
