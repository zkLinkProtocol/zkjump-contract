// SPDX-License-Identifier: MIT OR Apache-2.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControlDefaultAdminRules.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "zklink-contracts-interface/contracts/IZkLink.sol";

import "./Events.sol";
import "./Config.sol";

/// @title zkJump contract
/// @author zkJump.io
abstract contract AbstractZkJump is
    AccessControlDefaultAdminRules,
    Config,
    ERC20,
    Events
{
    uint48 public constant DEFAULT_BROKER_HARVEST_DELAY = 1 days;
    uint48 public brokerWithdrawDelay = DEFAULT_BROKER_HARVEST_DELAY;
    mapping(address => uint48) private brokerDelayMapping;

    constructor() AccessControlDefaultAdminRules(1 days, msg.sender) {}

    /**
     * @dev Grants the broker role to an account.
     * @param account The address of the account to grant the broker role.
     */
    function grantBroker(address account) external {
        grantRole(BROKER_ROLE, account);
    }

    function changeDelay(
        uint48 newDelay
    ) public onlyRole(getRoleAdmin(BROKER_ROLE)) {
        brokerWithdrawDelay = uint48(Math.max(newDelay, 1 days));
    }

    function harvest(uint256 amount) public {
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

    function onlyBroker(
        uint104 maxAmount,
        uint104 fee,
        bool isEthFee,
        uint256 deadlineTime,
        uint8 chainId,
        bytes memory signature
    ) public view returns (address) {
        bytes32 prefixedHash = keccak256(
            abi.encodePacked(
                "\x19Ethereum Signed Message:\n32",
                maxAmount,
                fee,
                isEthFee,
                getBridgeToken(),
                deadlineTime,
                chainId
            )
        );
        require(signature.length == 65, "incorrect signature length");

        bytes32 r;
        bytes32 s;
        uint8 v;
        assembly {
            r := mload(add(signature, 32))
            s := mload(add(signature, 64))
            v := byte(0, mload(add(signature, 96)))
        }
        address brokerAddress = ecrecover(prefixedHash, v, r, s);
        _checkRole(BROKER_ROLE, brokerAddress);
        return brokerAddress;
    }
}
