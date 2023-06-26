import { Command, Option } from 'commander'
import { JSONRPCClient } from 'json-rpc-2.0'
import fetch from 'node-fetch'
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'path'
import { format } from 'prettier'
import AsciiTable from 'ascii-table'
import hre from 'hardhat'
import type * as ethers from 'ethers'

import __env from '../etc/env'
import { ENV_INFO_URL, BLOCK_TOKENS, ZKLINK_NETWORK_API } from './constant'
import {
  createSupportChainsFile,
  fetchApi,
  getRPCClient,
  handleSupportChainsData,
  isLpToken,
} from './utils'
const env: Record<string, any> = {}
__env.forEach((item) => {
  env[item.chainId.toString()] = item
})

const program = new Command()
program.version('0.0.1')

let networkIdOption = new Option('-i, --network-id <networkId>', 'Network ID').choices([
  '1',
  '2',
  '...',
])
networkIdOption.mandatory = true

let envNameOption = new Option('-e, --env-name <envName>', 'Env Name').choices([
  'mainnet',
  'devnet',
  'testnet',
])
envNameOption.mandatory = true

let contractNameOption = new Option('-c, --contract-name <contractName>', 'Contract Name').choices([
  'ZkJumpETH',
  'ZkJumpERC20',
])
contractNameOption.mandatory = true
let tokenContractAddressOption = new Option(
  '-t, --token-contract-address <tokenContractAddress>',
  'ERC20 Token Contract Address'
)

program
  .command('init')
  .description('')
  .addOption(envNameOption)
  .action(async (options) => {
    await init(options.envName)
  })

program
  .command('deploy')
  .addOption(networkIdOption)
  .addOption(contractNameOption)
  .addOption(tokenContractAddressOption)
  .addOption(new Option('-g, --gas-token <gasToken>', 'Gas Fee Manage Contract'))
  .action(async (options) => {
    await hre.run('compile')
    let provider = new hre.ethers.JsonRpcProvider(hre.config.networks[options.networkId]['url'])
    const wallet = new hre.ethers.Wallet(
      hre.config.networks[options.networkId].accounts[0],
      provider
    )
    const signer = wallet.connect(provider)

    if (options.contractName == 'ZkJumpETH') {
      await deployZkJumpETH(options.networkId, signer)
    } else if (options.contractName == 'ZkJumpERC20') {
      await deployZkJumpERC20(
        options.networkId,
        options.gasToken,
        options.tokenContractAddress,
        signer
      )
    }
  })
program.parse()

async function deployZkJumpETH(networkId: string, signer: ethers.Signer) {
  let envInstance = env[networkId]
  if (envInstance == undefined) {
    throw new Error('networkId is not exist')
  }

  const ZkJumpETH = await hre.ethers.deployContract('ZkJumpETH', [envInstance.mainContract], signer)

  await ZkJumpETH.waitForDeployment()
  let gasFeeManageAddrss = await ZkJumpETH.getAddress()
  var table = new AsciiTable()
  table.setHeading('Contract Name', 'Contract Address', 'ChainID')
  table.addRow('ZkJumpETH', gasFeeManageAddrss, envInstance.layerOneChainId)
  console.log(table.toString())
}

async function deployZkJumpERC20(
  networkId: string,
  gasToken: string,
  tokenContractAddress: string,
  signer: ethers.Signer
) {
  let envInstance = env[networkId]
  if (envInstance === undefined) {
    throw new Error('networkId is not exist')
  }
  const ZkJumpERC20 = await hre.ethers.deployContract(
    'ZkJumpERC20',
    [tokenContractAddress, gasToken, envInstance.mainContract],
    signer
  )
  await ZkJumpERC20.waitForDeployment()
  let erc20TokenJump = await ZkJumpERC20.getAddress()

  var table = new AsciiTable()
  table.setHeading('Contract Name', 'Contract Address', 'ChainID')
  table.addRow('ZkJumpERC20', erc20TokenJump, envInstance.layerOneChainId)
  console.log(table.toString())
}

async function init(envName: string) {
  const client = getRPCClient(envName)
  /** get support Chains data*/
  let supportChains = await client.request('getSupportChains', [])
  /** get support token data*/
  let supportTokens = await client.request('getSupportTokens', [])
  /** get chain info*/
  let staticChainInfo = await fetchApi(ZKLINK_NETWORK_API)
  /** Integration of supportChains data */
  supportChains = handleSupportChainsData({ staticChainInfo, supportChains, supportTokens })
  /** Creating an env file */
  createSupportChainsFile(supportChains)
  console.log('Successful initialization.')
}
