// SPDX-License-Identifier: MIT OR Apache-2.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControlDefaultAdminRules.sol";
import "@openzeppelin/contracts/utils/math/SafeCast.sol";
import "zklink-contracts-interface/contracts/IZkLink.sol";

/// @title zkJump contract
/// @author zkJump.io
contract ZkJump is ReentrancyGuard, AccessControlDefaultAdminRules {
    /// @dev Address represent eth when deposit or withdraw
    /// copy from zklink-contracts
    address internal constant ETH_ADDRESS =
        0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    event BridgeEvent(
        address brokerAddress,
        bytes32 userAddress,
        uint8 chainId,
        uint128 amount,
        uint128 fee,
        address token
    );

    bytes32 public constant BROKER_ROLE = keccak256("BROKER");

    IZkLink public zkLinkInstance;

    constructor(
        IZkLink _zkLinkInstance
    ) AccessControlDefaultAdminRules(1 days, msg.sender) {
        zkLinkInstance = _zkLinkInstance;
    }

    /**
     * @dev Grants the broker role to an account.
     * @param account The address of the account to grant the broker role.
     */
    function grantBroker(address account) external {
        grantRole(BROKER_ROLE, account);
    }

    /**
     * @dev Bridge ETH from one chain to another.
     * @param userAddress The address of the user on the other chain.
     * @param subAccountId The sub-account ID of the user on zkLink Layer2
     * @param deadlineTime The deadline timestamp for the bridge operation.
     * @param chainId The ID of the destination chain. (define by zkLink)
     * @param maxAmount The maximum allowed amount of ETH for the bridge operation.
     * @param fee The fee amount for the bridge operation.
     * @param v The recovery byte of the broker's signature.
     * @param r The `r` value of the broker's signature.
     * @param s The `s` value of the broker's signature.
     */
    function bridgeETH(
        bytes32 userAddress,
        uint8 subAccountId,
        uint256 deadlineTime,
        uint8 chainId,
        uint104 maxAmount,
        uint104 fee,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external payable nonReentrant {
        require(
            block.timestamp <= deadlineTime,
            "Bridge operation has timed out"
        );
        require(msg.value <= maxAmount, "Amount exceeds the maximum allowed");
        require(msg.value > fee, "Amount is too small to cover the fee");

        bytes32 prefixedHash = keccak256(
            abi.encodePacked(
                "\x19Ethereum Signed Message:\n32",
                maxAmount,
                fee,
                deadlineTime,
                chainId
            )
        );
        address brokerAddress = ecrecover(prefixedHash, v, r, s);
        _checkRole(BROKER_ROLE, brokerAddress);

        uint128 bridgeAmount = SafeCast.toUint128(msg.value) - fee;
        zkLinkInstance.depositETH(userAddress, subAccountId);
        emit BridgeEvent(
            brokerAddress,
            userAddress,
            chainId,
            bridgeAmount,
            fee,
            ETH_ADDRESS
        );
    }

    /**
     * @dev Bridge ERC20 tokens from one chain to another.
     * @param token The address of the ERC20 token contract.
     * @param amount The amount of tokens to bridge.
     * @param userAddress The address of the user on the other chain.
     * @param subAccountId The sub-account ID of the user on zkLink Layer2
     * @param deadlineTime The deadline timestamp for the bridge operation.
     * @param chainId The ID of the destination chain.(define by zkLink)
     * @param ismapping A boolean indicating whether the token is being mapped to another token on zkLink layer2.
     *                  This variable is defined by zkLink and used in the scenario where USDC and BUSD are merged into USD.
     * @param maxAmount The maximum allowed amount for the bridge operation.
     * @param fee The fee amount for the bridge operation.
     * @param v The recovery byte of the broker's signature.
     * @param r The `r` value of the broker's signature.
     * @param s The `s` value of the broker's signature.
     */
    function bridgeERC20(
        IERC20 token,
        uint104 amount,
        bytes32 userAddress,
        uint8 subAccountId,
        uint256 deadlineTime,
        uint8 chainId,
        bool ismapping,
        uint104 maxAmount,
        uint104 fee,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external nonReentrant {
        require(
            block.timestamp <= deadlineTime,
            "Bridge operation has timed out"
        );
        require(amount <= maxAmount, "Amount exceeds the maximum allowed");
        require(amount > fee, "Amount is too small to cover the fee");

        bytes32 prefixedHash = keccak256(
            abi.encodePacked(
                "\x19Ethereum Signed Message:\n32",
                maxAmount,
                fee,
                token,
                deadlineTime,
                chainId
            )
        );
        address brokerAddress = ecrecover(prefixedHash, v, r, s);
        _checkRole(BROKER_ROLE, brokerAddress);

        uint104 bridgeAmount = amount - fee;
        zkLinkInstance.depositERC20(
            token,
            bridgeAmount,
            userAddress,
            subAccountId,
            ismapping
        );

        emit BridgeEvent(
            brokerAddress,
            userAddress,
            chainId,
            bridgeAmount,
            fee,
            address(token)
        );
    }
}
