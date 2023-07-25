//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "zklink-contracts-interface/contracts/IZkLink.sol";

contract Multicall {
    struct Result {
        bool success;
        bytes returnData;
    }
    IZkLink zkLinkInstance;

    constructor(IZkLink _zkLinkInstance) {
        zkLinkInstance = _zkLinkInstance;
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

    function batchWithdrawPendingBalance(
        address payable[] memory owners,
        uint16[] memory tokenids,
        uint128[] memory amounts
    ) external returns (uint8 res) {
        require(owners.length == tokenids.length, "invalid data");
        require(owners.length == amounts.length, "invalid data2");
        res = 0;
        for (uint8 i = 0; i < owners.length; i++) {
            try
                zkLinkInstance.withdrawPendingBalance(
                    owners[i],
                    tokenids[i],
                    amounts[i]
                )
            {
                res++;
            } catch {
                //do nothing
            }
        }
    }
}
