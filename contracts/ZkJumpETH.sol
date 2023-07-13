// SPDX-License-Identifier: MIT OR Apache-2.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControlDefaultAdminRules.sol";
import "@openzeppelin/contracts/utils/math/SafeCast.sol";
import "zklink-contracts-interface/contracts/IZkLink.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "./IZkJumpETH.sol";
import "./AbstractZkJump.sol";

/// @title zkJump contract
/// @author zkJump.io
contract ZkJumpETH is ReentrancyGuard, AbstractZkJump, IZkJumpETH {
    IZkLink public zkLinkInstance;
    address internal constant ETH_ADDRESS =
        0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    constructor(IZkLink _zkLinkInstance) ERC20("ZkJump-ETH", "Jump-ETH") {
        zkLinkInstance = _zkLinkInstance;
    }

    //only TESTNET
    function updateZkLinkInstance(
        IZkLink _zkLinkInstance
    ) external nonReentrant onlyRole(getRoleAdmin(BRIDGE_BROKER_ROLE)) {
        zkLinkInstance = _zkLinkInstance;
    }

    function receiveFee(address brokerAddress) external payable override {
        _mint(brokerAddress, msg.value);
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
        require(!ismapping, "ismapping must be false");
        require(isEthFee, "isEthFee must be true");
        require(
            block.timestamp <= deadlineTime,
            "Bridge operation has timed out"
        );
        require(amount == 0, "");
        amount = SafeCast.toUint104(msg.value);
        require(amount <= maxAmount, "Amount exceeds the maximum allowed");
        require(amount > fee, "Amount is too small to cover the fee");

        address brokerAddress = onlyBridgeBroker(
            maxAmount,
            fee,
            isEthFee,
            deadlineTime,
            chainId,
            signature
        );

        uint104 bridgeAmount = amount - fee;

        zkLinkInstance.depositETH{value: bridgeAmount}(
            userAddress,
            subAccountId
        );

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
        (bool sent, bytes memory _data) = to.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    function getBridgeToken() public pure override returns (address) {
        return ETH_ADDRESS;
    }
}
