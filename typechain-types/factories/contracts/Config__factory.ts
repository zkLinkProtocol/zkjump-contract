/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { Config, ConfigInterface } from "../../contracts/Config";

const _abi = [
  {
    inputs: [],
    name: "BROKER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608080604052346014576098908161001a8239f35b600080fdfe6080806040526004361015601257600080fd5b600090813560e01c63029793ec14602857600080fd5b34605e5781600319360112605e57807f7fcce6a499b6d8a3672e3669f525a458fa2543baa244623617dd2ae829df407d60209252f35b5080fdfea2646970667358221220c900a2dfbfa51c9cda04a6edcee88411932be37f0fa95c169fade1850cd7a32b64736f6c63430008120033";

type ConfigConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ConfigConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Config__factory extends ContractFactory {
  constructor(...args: ConfigConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      Config & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Config__factory {
    return super.connect(runner) as Config__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ConfigInterface {
    return new Interface(_abi) as ConfigInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Config {
    return new Contract(address, _abi, runner) as unknown as Config;
  }
}
