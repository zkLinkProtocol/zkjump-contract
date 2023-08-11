// SPDX-License-Identifier: MIT OR Apache-2.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControlDefaultAdminRules.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "zklink-contracts-interface/contracts/IZkLink.sol";

import "./Events.sol";
import "./Config.sol";

/// @title zkJump and Broker contract
/// @author zkJump.io
abstract contract AbstractZkJump is
    AccessControlDefaultAdminRules,
    Config,
    ERC20,
    Events,
    EIP712
{
    string public constant DOMAIN_NAME = "ZkJump";
    string public constant DOMAIN_VERSION = "1.0";
    bytes32 public constant BROKER_SIGN_DATA_TYPE_HASH =
        keccak256(
            "BrokerSignData(uint104 maxAmount,uint104 fee,bool isEthFee,address bridgeToken,uint256 deadlineTime,uint8 chainId)"
        );

    uint48 public constant DEFAULT_BROKER_HARVEST_DELAY = 1 days;
    uint48 public brokerWithdrawDelay = DEFAULT_BROKER_HARVEST_DELAY;
    mapping(address => uint48) private brokerDelayMapping;

    constructor()
        EIP712(DOMAIN_NAME, DOMAIN_VERSION)
        AccessControlDefaultAdminRules(1 days, msg.sender)
    {}

    /**
     * @dev Grants the broker role to an account.
     * @param account The address of the account to grant the broker role.
     */
    function grantBroker(address account) external {
        grantRole(BRIDGE_BROKER_ROLE, account);
    }

    function changeDelay(
        uint48 newDelay
    ) public onlyRole(getRoleAdmin(BRIDGE_BROKER_ROLE)) {
        brokerWithdrawDelay = uint48(Math.max(newDelay, 1 days));
    }

    function harvest(uint256 amount) public onlyRole(BRIDGE_BROKER_ROLE) {
        if (amount == 0) {
            amount = balanceOf(_msgSender());
        }
        _transferToken(_msgSender(), amount);
        _burn(_msgSender(), amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        if (from == address(0)) {
            // _mint
            brokerDelayMapping[to] = uint48(
                block.timestamp + brokerWithdrawDelay
            );
        } else if (brokerDelayMapping[from] != 0) {
            // _burn || _transfer
            require(
                brokerDelayMapping[from] < block.timestamp,
                "broker delay not passed"
            );
        }
    }

    function _transferToken(address to, uint256 amount) internal virtual;

    function getBridgeToken() public view virtual returns (address);

    /**
     * @dev Bridge tokens from one chain to another.
     * @param amount The amount of tokens to bridge.
     * @param userAddress The address of the user on the other chain.
     * @param subAccountId The sub-account ID of the user on zkLink Layer2
     * @param deadlineTime The deadline timestamp for the bridge operation.
     * @param chainId The ID of the destination chain.(define by zkLink)
     * @param ismapping A boolean indicating whether the token is being mapped to another token on zkLink layer2.
     *                  This variable is defined by zkLink and used in the scenario where USDC and BUSD are merged into USD.
     * @param maxAmount The maximum allowed amount for the bridge operation.
     * @param fee The fee amount for the bridge operation.
     */
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
    ) external payable virtual;

    function onlyBridgeBroker(
        uint104 maxAmount,
        uint104 fee,
        bool isEthFee,
        uint256 deadlineTime,
        uint8 chainId,
        bytes memory signature
    ) public view returns (address) {
        bytes32 digest = _hashTypedDataV4(
            keccak256(
                abi.encode(
                    BROKER_SIGN_DATA_TYPE_HASH,
                    maxAmount,
                    fee,
                    isEthFee,
                    getBridgeToken(),
                    deadlineTime,
                    chainId
                )
            )
        );

        address brokerAddress = ECDSA.recover(digest, signature);
        _checkRole(BRIDGE_BROKER_ROLE, brokerAddress);
        return brokerAddress;
    }
}
