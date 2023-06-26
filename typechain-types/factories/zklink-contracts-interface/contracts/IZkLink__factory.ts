/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IZkLink,
  IZkLinkInterface,
} from "../../../zklink-contracts-interface/contracts/IZkLink";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "acceptor",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "accountId",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint16",
        name: "tokenId",
        type: "uint16",
      },
      {
        internalType: "uint128",
        name: "amount",
        type: "uint128",
      },
      {
        internalType: "uint16",
        name: "withdrawFeeRate",
        type: "uint16",
      },
      {
        internalType: "uint32",
        name: "accountIdOfNonce",
        type: "uint32",
      },
      {
        internalType: "uint8",
        name: "subAccountIdOfNonce",
        type: "uint8",
      },
      {
        internalType: "uint32",
        name: "nonce",
        type: "uint32",
      },
      {
        internalType: "uint128",
        name: "amountTransfer",
        type: "uint128",
      },
    ],
    name: "acceptERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "acceptor",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "accountId",
        type: "uint32",
      },
      {
        internalType: "address payable",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint128",
        name: "amount",
        type: "uint128",
      },
      {
        internalType: "uint16",
        name: "withdrawFeeRate",
        type: "uint16",
      },
      {
        internalType: "uint32",
        name: "accountIdOfNonce",
        type: "uint32",
      },
      {
        internalType: "uint8",
        name: "subAccountIdOfNonce",
        type: "uint8",
      },
      {
        internalType: "uint32",
        name: "nonce",
        type: "uint32",
      },
    ],
    name: "acceptETH",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "tokenId",
        type: "uint16",
      },
      {
        internalType: "address",
        name: "acceptor",
        type: "address",
      },
      {
        internalType: "address",
        name: "broker",
        type: "address",
      },
    ],
    name: "brokerAllowance",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "tokenId",
        type: "uint16",
      },
      {
        internalType: "address",
        name: "broker",
        type: "address",
      },
      {
        internalType: "uint128",
        name: "amount",
        type: "uint128",
      },
    ],
    name: "brokerApprove",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint104",
        name: "_amount",
        type: "uint104",
      },
      {
        internalType: "bytes32",
        name: "_zkLinkAddress",
        type: "bytes32",
      },
      {
        internalType: "uint8",
        name: "_subAccountId",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "_mapping",
        type: "bool",
      },
    ],
    name: "depositERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_zkLinkAddress",
        type: "bytes32",
      },
      {
        internalType: "uint8",
        name: "_subAccountId",
        type: "uint8",
      },
    ],
    name: "depositETH",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "blockNumber",
            type: "uint32",
          },
          {
            internalType: "uint64",
            name: "priorityOperations",
            type: "uint64",
          },
          {
            internalType: "bytes32",
            name: "pendingOnchainOperationsHash",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "stateHash",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "commitment",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "syncHash",
            type: "bytes32",
          },
        ],
        internalType: "struct IZkLink.StoredBlockInfo",
        name: "block",
        type: "tuple",
      },
    ],
    name: "getSynchronizedProgress",
    outputs: [
      {
        internalType: "uint256",
        name: "progress",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "syncHash",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "progress",
        type: "uint256",
      },
    ],
    name: "receiveSynchronizationProgress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "tokenIds",
    outputs: [
      {
        internalType: "uint16",
        name: "tokenId",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IZkLink__factory {
  static readonly abi = _abi;
  static createInterface(): IZkLinkInterface {
    return new Interface(_abi) as IZkLinkInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): IZkLink {
    return new Contract(address, _abi, runner) as unknown as IZkLink;
  }
}
