/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface ZkJumpERC20Interface extends Interface {
  getFunction(
    nameOrSignature:
      | "BROKER_ROLE"
      | "BROKER_SIGN_DATA_TYPE_HASH"
      | "DEFAULT_ADMIN_ROLE"
      | "DEFAULT_BROKER_HARVEST_DELAY"
      | "DOMAIN_NAME"
      | "DOMAIN_VERSION"
      | "acceptDefaultAdminTransfer"
      | "allowance"
      | "approve"
      | "balanceOf"
      | "beginDefaultAdminTransfer"
      | "bridge"
      | "brokerWithdrawDelay"
      | "cancelDefaultAdminTransfer"
      | "changeDefaultAdminDelay"
      | "changeDelay"
      | "decimals"
      | "decreaseAllowance"
      | "defaultAdmin"
      | "defaultAdminDelay"
      | "defaultAdminDelayIncreaseWait"
      | "eip712Domain"
      | "getBridgeToken"
      | "getRoleAdmin"
      | "grantBroker"
      | "grantRole"
      | "harvest"
      | "hasRole"
      | "increaseAllowance"
      | "name"
      | "onlyBroker"
      | "owner"
      | "pendingDefaultAdmin"
      | "pendingDefaultAdminDelay"
      | "renounceRole"
      | "revokeRole"
      | "rollbackDefaultAdminDelay"
      | "supportsInterface"
      | "symbol"
      | "totalSupply"
      | "transfer"
      | "transferFrom"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Approval"
      | "BridgeEvent"
      | "DefaultAdminDelayChangeCanceled"
      | "DefaultAdminDelayChangeScheduled"
      | "DefaultAdminTransferCanceled"
      | "DefaultAdminTransferScheduled"
      | "EIP712DomainChanged"
      | "RoleAdminChanged"
      | "RoleGranted"
      | "RoleRevoked"
      | "Transfer"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "BROKER_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "BROKER_SIGN_DATA_TYPE_HASH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "DEFAULT_BROKER_HARVEST_DELAY",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "DOMAIN_NAME",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "DOMAIN_VERSION",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "acceptDefaultAdminTransfer",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "allowance",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "beginDefaultAdminTransfer",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "bridge",
    values: [
      BigNumberish,
      BytesLike,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      boolean,
      BigNumberish,
      BigNumberish,
      boolean,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "brokerWithdrawDelay",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "cancelDefaultAdminTransfer",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "changeDefaultAdminDelay",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "changeDelay",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "decreaseAllowance",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "defaultAdmin",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "defaultAdminDelay",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "defaultAdminDelayIncreaseWait",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "eip712Domain",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getBridgeToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "grantBroker",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "harvest",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "increaseAllowance",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "onlyBroker",
    values: [
      BigNumberish,
      BigNumberish,
      boolean,
      BigNumberish,
      BigNumberish,
      BytesLike
    ]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pendingDefaultAdmin",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "pendingDefaultAdminDelay",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "rollbackDefaultAdminDelay",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "BROKER_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "BROKER_SIGN_DATA_TYPE_HASH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "DEFAULT_BROKER_HARVEST_DELAY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "DOMAIN_NAME",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "DOMAIN_VERSION",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "acceptDefaultAdminTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "beginDefaultAdminTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "bridge", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "brokerWithdrawDelay",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "cancelDefaultAdminTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeDefaultAdminDelay",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeDelay",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "decreaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "defaultAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "defaultAdminDelay",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "defaultAdminDelayIncreaseWait",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "eip712Domain",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBridgeToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "grantBroker",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "harvest", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "increaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "onlyBroker", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingDefaultAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "pendingDefaultAdminDelay",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "rollbackDefaultAdminDelay",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
}

export namespace ApprovalEvent {
  export type InputTuple = [
    owner: AddressLike,
    spender: AddressLike,
    value: BigNumberish
  ];
  export type OutputTuple = [owner: string, spender: string, value: bigint];
  export interface OutputObject {
    owner: string;
    spender: string;
    value: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace BridgeEventEvent {
  export type InputTuple = [
    brokerAddress: AddressLike,
    userAddress: BytesLike,
    chainId: BigNumberish,
    amount: BigNumberish,
    fee: BigNumberish,
    isEthFee: boolean
  ];
  export type OutputTuple = [
    brokerAddress: string,
    userAddress: string,
    chainId: bigint,
    amount: bigint,
    fee: bigint,
    isEthFee: boolean
  ];
  export interface OutputObject {
    brokerAddress: string;
    userAddress: string;
    chainId: bigint;
    amount: bigint;
    fee: bigint;
    isEthFee: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DefaultAdminDelayChangeCanceledEvent {
  export type InputTuple = [];
  export type OutputTuple = [];
  export interface OutputObject {}
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DefaultAdminDelayChangeScheduledEvent {
  export type InputTuple = [
    newDelay: BigNumberish,
    effectSchedule: BigNumberish
  ];
  export type OutputTuple = [newDelay: bigint, effectSchedule: bigint];
  export interface OutputObject {
    newDelay: bigint;
    effectSchedule: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DefaultAdminTransferCanceledEvent {
  export type InputTuple = [];
  export type OutputTuple = [];
  export interface OutputObject {}
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DefaultAdminTransferScheduledEvent {
  export type InputTuple = [
    newAdmin: AddressLike,
    acceptSchedule: BigNumberish
  ];
  export type OutputTuple = [newAdmin: string, acceptSchedule: bigint];
  export interface OutputObject {
    newAdmin: string;
    acceptSchedule: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace EIP712DomainChangedEvent {
  export type InputTuple = [];
  export type OutputTuple = [];
  export interface OutputObject {}
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleAdminChangedEvent {
  export type InputTuple = [
    role: BytesLike,
    previousAdminRole: BytesLike,
    newAdminRole: BytesLike
  ];
  export type OutputTuple = [
    role: string,
    previousAdminRole: string,
    newAdminRole: string
  ];
  export interface OutputObject {
    role: string;
    previousAdminRole: string;
    newAdminRole: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleGrantedEvent {
  export type InputTuple = [
    role: BytesLike,
    account: AddressLike,
    sender: AddressLike
  ];
  export type OutputTuple = [role: string, account: string, sender: string];
  export interface OutputObject {
    role: string;
    account: string;
    sender: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleRevokedEvent {
  export type InputTuple = [
    role: BytesLike,
    account: AddressLike,
    sender: AddressLike
  ];
  export type OutputTuple = [role: string, account: string, sender: string];
  export interface OutputObject {
    role: string;
    account: string;
    sender: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransferEvent {
  export type InputTuple = [
    from: AddressLike,
    to: AddressLike,
    value: BigNumberish
  ];
  export type OutputTuple = [from: string, to: string, value: bigint];
  export interface OutputObject {
    from: string;
    to: string;
    value: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface ZkJumpERC20 extends BaseContract {
  connect(runner?: ContractRunner | null): ZkJumpERC20;
  waitForDeployment(): Promise<this>;

  interface: ZkJumpERC20Interface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  BROKER_ROLE: TypedContractMethod<[], [string], "view">;

  BROKER_SIGN_DATA_TYPE_HASH: TypedContractMethod<[], [string], "view">;

  DEFAULT_ADMIN_ROLE: TypedContractMethod<[], [string], "view">;

  DEFAULT_BROKER_HARVEST_DELAY: TypedContractMethod<[], [bigint], "view">;

  DOMAIN_NAME: TypedContractMethod<[], [string], "view">;

  DOMAIN_VERSION: TypedContractMethod<[], [string], "view">;

  acceptDefaultAdminTransfer: TypedContractMethod<[], [void], "nonpayable">;

  allowance: TypedContractMethod<
    [owner: AddressLike, spender: AddressLike],
    [bigint],
    "view"
  >;

  approve: TypedContractMethod<
    [spender: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  balanceOf: TypedContractMethod<[account: AddressLike], [bigint], "view">;

  beginDefaultAdminTransfer: TypedContractMethod<
    [newAdmin: AddressLike],
    [void],
    "nonpayable"
  >;

  bridge: TypedContractMethod<
    [
      amount: BigNumberish,
      userAddress: BytesLike,
      subAccountId: BigNumberish,
      deadlineTime: BigNumberish,
      chainId: BigNumberish,
      ismapping: boolean,
      maxAmount: BigNumberish,
      fee: BigNumberish,
      isEthFee: boolean,
      signature: BytesLike
    ],
    [void],
    "payable"
  >;

  brokerWithdrawDelay: TypedContractMethod<[], [bigint], "view">;

  cancelDefaultAdminTransfer: TypedContractMethod<[], [void], "nonpayable">;

  changeDefaultAdminDelay: TypedContractMethod<
    [newDelay: BigNumberish],
    [void],
    "nonpayable"
  >;

  changeDelay: TypedContractMethod<
    [newDelay: BigNumberish],
    [void],
    "nonpayable"
  >;

  decimals: TypedContractMethod<[], [bigint], "view">;

  decreaseAllowance: TypedContractMethod<
    [spender: AddressLike, subtractedValue: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  defaultAdmin: TypedContractMethod<[], [string], "view">;

  defaultAdminDelay: TypedContractMethod<[], [bigint], "view">;

  defaultAdminDelayIncreaseWait: TypedContractMethod<[], [bigint], "view">;

  eip712Domain: TypedContractMethod<
    [],
    [
      [string, string, string, bigint, string, string, bigint[]] & {
        fields: string;
        name: string;
        version: string;
        chainId: bigint;
        verifyingContract: string;
        salt: string;
        extensions: bigint[];
      }
    ],
    "view"
  >;

  getBridgeToken: TypedContractMethod<[], [string], "view">;

  getRoleAdmin: TypedContractMethod<[role: BytesLike], [string], "view">;

  grantBroker: TypedContractMethod<
    [account: AddressLike],
    [void],
    "nonpayable"
  >;

  grantRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;

  harvest: TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;

  hasRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [boolean],
    "view"
  >;

  increaseAllowance: TypedContractMethod<
    [spender: AddressLike, addedValue: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  name: TypedContractMethod<[], [string], "view">;

  onlyBroker: TypedContractMethod<
    [
      maxAmount: BigNumberish,
      fee: BigNumberish,
      isEthFee: boolean,
      deadlineTime: BigNumberish,
      chainId: BigNumberish,
      signature: BytesLike
    ],
    [string],
    "view"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  pendingDefaultAdmin: TypedContractMethod<
    [],
    [[string, bigint] & { newAdmin: string; schedule: bigint }],
    "view"
  >;

  pendingDefaultAdminDelay: TypedContractMethod<
    [],
    [[bigint, bigint] & { newDelay: bigint; schedule: bigint }],
    "view"
  >;

  renounceRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;

  revokeRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;

  rollbackDefaultAdminDelay: TypedContractMethod<[], [void], "nonpayable">;

  supportsInterface: TypedContractMethod<
    [interfaceId: BytesLike],
    [boolean],
    "view"
  >;

  symbol: TypedContractMethod<[], [string], "view">;

  totalSupply: TypedContractMethod<[], [bigint], "view">;

  transfer: TypedContractMethod<
    [to: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  transferFrom: TypedContractMethod<
    [from: AddressLike, to: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "BROKER_ROLE"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "BROKER_SIGN_DATA_TYPE_HASH"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "DEFAULT_ADMIN_ROLE"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "DEFAULT_BROKER_HARVEST_DELAY"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "DOMAIN_NAME"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "DOMAIN_VERSION"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "acceptDefaultAdminTransfer"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "allowance"
  ): TypedContractMethod<
    [owner: AddressLike, spender: AddressLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "approve"
  ): TypedContractMethod<
    [spender: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "balanceOf"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "beginDefaultAdminTransfer"
  ): TypedContractMethod<[newAdmin: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "bridge"
  ): TypedContractMethod<
    [
      amount: BigNumberish,
      userAddress: BytesLike,
      subAccountId: BigNumberish,
      deadlineTime: BigNumberish,
      chainId: BigNumberish,
      ismapping: boolean,
      maxAmount: BigNumberish,
      fee: BigNumberish,
      isEthFee: boolean,
      signature: BytesLike
    ],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "brokerWithdrawDelay"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "cancelDefaultAdminTransfer"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "changeDefaultAdminDelay"
  ): TypedContractMethod<[newDelay: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "changeDelay"
  ): TypedContractMethod<[newDelay: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "decimals"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "decreaseAllowance"
  ): TypedContractMethod<
    [spender: AddressLike, subtractedValue: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "defaultAdmin"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "defaultAdminDelay"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "defaultAdminDelayIncreaseWait"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "eip712Domain"
  ): TypedContractMethod<
    [],
    [
      [string, string, string, bigint, string, string, bigint[]] & {
        fields: string;
        name: string;
        version: string;
        chainId: bigint;
        verifyingContract: string;
        salt: string;
        extensions: bigint[];
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "getBridgeToken"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getRoleAdmin"
  ): TypedContractMethod<[role: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "grantBroker"
  ): TypedContractMethod<[account: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "grantRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "harvest"
  ): TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "hasRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "increaseAllowance"
  ): TypedContractMethod<
    [spender: AddressLike, addedValue: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "name"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "onlyBroker"
  ): TypedContractMethod<
    [
      maxAmount: BigNumberish,
      fee: BigNumberish,
      isEthFee: boolean,
      deadlineTime: BigNumberish,
      chainId: BigNumberish,
      signature: BytesLike
    ],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "pendingDefaultAdmin"
  ): TypedContractMethod<
    [],
    [[string, bigint] & { newAdmin: string; schedule: bigint }],
    "view"
  >;
  getFunction(
    nameOrSignature: "pendingDefaultAdminDelay"
  ): TypedContractMethod<
    [],
    [[bigint, bigint] & { newDelay: bigint; schedule: bigint }],
    "view"
  >;
  getFunction(
    nameOrSignature: "renounceRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "revokeRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "rollbackDefaultAdminDelay"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "symbol"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "totalSupply"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "transfer"
  ): TypedContractMethod<
    [to: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferFrom"
  ): TypedContractMethod<
    [from: AddressLike, to: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  getEvent(
    key: "Approval"
  ): TypedContractEvent<
    ApprovalEvent.InputTuple,
    ApprovalEvent.OutputTuple,
    ApprovalEvent.OutputObject
  >;
  getEvent(
    key: "BridgeEvent"
  ): TypedContractEvent<
    BridgeEventEvent.InputTuple,
    BridgeEventEvent.OutputTuple,
    BridgeEventEvent.OutputObject
  >;
  getEvent(
    key: "DefaultAdminDelayChangeCanceled"
  ): TypedContractEvent<
    DefaultAdminDelayChangeCanceledEvent.InputTuple,
    DefaultAdminDelayChangeCanceledEvent.OutputTuple,
    DefaultAdminDelayChangeCanceledEvent.OutputObject
  >;
  getEvent(
    key: "DefaultAdminDelayChangeScheduled"
  ): TypedContractEvent<
    DefaultAdminDelayChangeScheduledEvent.InputTuple,
    DefaultAdminDelayChangeScheduledEvent.OutputTuple,
    DefaultAdminDelayChangeScheduledEvent.OutputObject
  >;
  getEvent(
    key: "DefaultAdminTransferCanceled"
  ): TypedContractEvent<
    DefaultAdminTransferCanceledEvent.InputTuple,
    DefaultAdminTransferCanceledEvent.OutputTuple,
    DefaultAdminTransferCanceledEvent.OutputObject
  >;
  getEvent(
    key: "DefaultAdminTransferScheduled"
  ): TypedContractEvent<
    DefaultAdminTransferScheduledEvent.InputTuple,
    DefaultAdminTransferScheduledEvent.OutputTuple,
    DefaultAdminTransferScheduledEvent.OutputObject
  >;
  getEvent(
    key: "EIP712DomainChanged"
  ): TypedContractEvent<
    EIP712DomainChangedEvent.InputTuple,
    EIP712DomainChangedEvent.OutputTuple,
    EIP712DomainChangedEvent.OutputObject
  >;
  getEvent(
    key: "RoleAdminChanged"
  ): TypedContractEvent<
    RoleAdminChangedEvent.InputTuple,
    RoleAdminChangedEvent.OutputTuple,
    RoleAdminChangedEvent.OutputObject
  >;
  getEvent(
    key: "RoleGranted"
  ): TypedContractEvent<
    RoleGrantedEvent.InputTuple,
    RoleGrantedEvent.OutputTuple,
    RoleGrantedEvent.OutputObject
  >;
  getEvent(
    key: "RoleRevoked"
  ): TypedContractEvent<
    RoleRevokedEvent.InputTuple,
    RoleRevokedEvent.OutputTuple,
    RoleRevokedEvent.OutputObject
  >;
  getEvent(
    key: "Transfer"
  ): TypedContractEvent<
    TransferEvent.InputTuple,
    TransferEvent.OutputTuple,
    TransferEvent.OutputObject
  >;

  filters: {
    "Approval(address,address,uint256)": TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;
    Approval: TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;

    "BridgeEvent(address,bytes32,uint8,uint128,uint128,bool)": TypedContractEvent<
      BridgeEventEvent.InputTuple,
      BridgeEventEvent.OutputTuple,
      BridgeEventEvent.OutputObject
    >;
    BridgeEvent: TypedContractEvent<
      BridgeEventEvent.InputTuple,
      BridgeEventEvent.OutputTuple,
      BridgeEventEvent.OutputObject
    >;

    "DefaultAdminDelayChangeCanceled()": TypedContractEvent<
      DefaultAdminDelayChangeCanceledEvent.InputTuple,
      DefaultAdminDelayChangeCanceledEvent.OutputTuple,
      DefaultAdminDelayChangeCanceledEvent.OutputObject
    >;
    DefaultAdminDelayChangeCanceled: TypedContractEvent<
      DefaultAdminDelayChangeCanceledEvent.InputTuple,
      DefaultAdminDelayChangeCanceledEvent.OutputTuple,
      DefaultAdminDelayChangeCanceledEvent.OutputObject
    >;

    "DefaultAdminDelayChangeScheduled(uint48,uint48)": TypedContractEvent<
      DefaultAdminDelayChangeScheduledEvent.InputTuple,
      DefaultAdminDelayChangeScheduledEvent.OutputTuple,
      DefaultAdminDelayChangeScheduledEvent.OutputObject
    >;
    DefaultAdminDelayChangeScheduled: TypedContractEvent<
      DefaultAdminDelayChangeScheduledEvent.InputTuple,
      DefaultAdminDelayChangeScheduledEvent.OutputTuple,
      DefaultAdminDelayChangeScheduledEvent.OutputObject
    >;

    "DefaultAdminTransferCanceled()": TypedContractEvent<
      DefaultAdminTransferCanceledEvent.InputTuple,
      DefaultAdminTransferCanceledEvent.OutputTuple,
      DefaultAdminTransferCanceledEvent.OutputObject
    >;
    DefaultAdminTransferCanceled: TypedContractEvent<
      DefaultAdminTransferCanceledEvent.InputTuple,
      DefaultAdminTransferCanceledEvent.OutputTuple,
      DefaultAdminTransferCanceledEvent.OutputObject
    >;

    "DefaultAdminTransferScheduled(address,uint48)": TypedContractEvent<
      DefaultAdminTransferScheduledEvent.InputTuple,
      DefaultAdminTransferScheduledEvent.OutputTuple,
      DefaultAdminTransferScheduledEvent.OutputObject
    >;
    DefaultAdminTransferScheduled: TypedContractEvent<
      DefaultAdminTransferScheduledEvent.InputTuple,
      DefaultAdminTransferScheduledEvent.OutputTuple,
      DefaultAdminTransferScheduledEvent.OutputObject
    >;

    "EIP712DomainChanged()": TypedContractEvent<
      EIP712DomainChangedEvent.InputTuple,
      EIP712DomainChangedEvent.OutputTuple,
      EIP712DomainChangedEvent.OutputObject
    >;
    EIP712DomainChanged: TypedContractEvent<
      EIP712DomainChangedEvent.InputTuple,
      EIP712DomainChangedEvent.OutputTuple,
      EIP712DomainChangedEvent.OutputObject
    >;

    "RoleAdminChanged(bytes32,bytes32,bytes32)": TypedContractEvent<
      RoleAdminChangedEvent.InputTuple,
      RoleAdminChangedEvent.OutputTuple,
      RoleAdminChangedEvent.OutputObject
    >;
    RoleAdminChanged: TypedContractEvent<
      RoleAdminChangedEvent.InputTuple,
      RoleAdminChangedEvent.OutputTuple,
      RoleAdminChangedEvent.OutputObject
    >;

    "RoleGranted(bytes32,address,address)": TypedContractEvent<
      RoleGrantedEvent.InputTuple,
      RoleGrantedEvent.OutputTuple,
      RoleGrantedEvent.OutputObject
    >;
    RoleGranted: TypedContractEvent<
      RoleGrantedEvent.InputTuple,
      RoleGrantedEvent.OutputTuple,
      RoleGrantedEvent.OutputObject
    >;

    "RoleRevoked(bytes32,address,address)": TypedContractEvent<
      RoleRevokedEvent.InputTuple,
      RoleRevokedEvent.OutputTuple,
      RoleRevokedEvent.OutputObject
    >;
    RoleRevoked: TypedContractEvent<
      RoleRevokedEvent.InputTuple,
      RoleRevokedEvent.OutputTuple,
      RoleRevokedEvent.OutputObject
    >;

    "Transfer(address,address,uint256)": TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
    Transfer: TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
  };
}
