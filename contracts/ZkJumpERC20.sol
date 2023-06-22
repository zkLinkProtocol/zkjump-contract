// SPDX-License-Identifier: MIT OR Apache-2.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControlDefaultAdminRules.sol";
import "@openzeppelin/contracts/utils/math/SafeCast.sol";
import "zklink-contracts-interface/contracts/IZkLink.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "./AbstractZkJump.sol";
import "./IZkJumpETH.sol";

/// @title zkJump contract
/// @author zkJump.io
contract ZkJumpERC20 is ReentrancyGuard, AbstractZkJump {
    IERC20Metadata bridgeToken;
    IZkJumpETH ethFeeManage;
    IZkLink zkLinkInstance;

    constructor(
        IERC20Metadata _bridgeToken,
        IZkJumpETH _ethFeeManage,
        IZkLink _zkLinkInstance
    )
        ERC20(
            string(abi.encodePacked("ZkJump-", _bridgeToken.name())),
            string(abi.encodePacked("Jump-", _bridgeToken.symbol()))
        )
    {
        bridgeToken = _bridgeToken;
        ethFeeManage = _ethFeeManage;
        zkLinkInstance = _zkLinkInstance;
    }

    function bridge(
        uint104 amount,
        bytes32 userAddress,
        uint8 subAccountId,
        uint256 deadlineTime,
        uint8 chainId,
        bool ismapping,
        uint104 maxAmount,
        uint104 fee,
        bool isEthFee,
        bytes memory signature
    ) external payable override nonReentrant {
        require(
            block.timestamp <= deadlineTime,
            "Bridge operation has timed out"
        );
        require(amount <= maxAmount, "Amount exceeds the maximum allowed");
        uint104 bridgeAmount;
        if (isEthFee) {
            fee = SafeCast.toUint104(msg.value);
            bridgeAmount = amount;
        } else {
            require(amount > fee, "Amount is too small to cover the fee");
            bridgeAmount = amount - fee;
        }

        bridgeToken.transferFrom(msg.sender, address(this), amount);
        bridgeToken.approve(address(zkLinkInstance), amount);
        zkLinkInstance.depositERC20(
            bridgeToken,
            bridgeAmount,
            userAddress,
            subAccountId,
            ismapping
        );
        address brokerAddress = onlyBroker(
            maxAmount,
            fee,
            isEthFee,
            deadlineTime,
            chainId,
            signature
        );

        if (isEthFee) {
            ethFeeManage.receiveFee{value: fee}(brokerAddress);
        } else {
            _mint(brokerAddress, fee);
        }

        emit BridgeEvent(
            brokerAddress,
            userAddress,
            chainId,
            bridgeAmount,
            fee,
            isEthFee
        );
    }

    function _transferToken(address to, uint256 amount) internal override {
        bridgeToken.transfer(to, amount);
    }

    function getBridgeToken() public view override returns (address) {
        return address(bridgeToken);
    }
}
