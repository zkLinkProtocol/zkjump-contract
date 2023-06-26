import { Command, Option } from 'commander'
import { JSONRPCClient } from 'json-rpc-2.0'
import fetch from 'node-fetch'
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'path'
import { format } from 'prettier'
import AsciiTable from 'ascii-table'
import hre from 'hardhat'
import type * as ethers from 'ethers'
import * as shell from 'shelljs'

import __env from '../etc/env'
import { ENV_INFO_URL, BLOCK_TOKENS, ZKLINK_NETWORK_API, BROKER_ADDRESS } from './constant'
import {
  appendDataToFile,
  createSupportChainsFile,
  fetchApi,
  getRPCClient,
  grantBroker,
  handleSupportChainsData,
  isLpToken,
} from './utils'
import { appendFile } from 'fs'
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

    const targetChain = env[options.networkId]
    if (options.contractName == 'ZkJumpETH') {
      await deployZkJumpETH(options.networkId, signer, { symbol: targetChain.symbol })
    } else if (options.contractName == 'ZkJumpERC20') {
      // await deployZkJumpERC20(
      //   options.networkId,
      //   options.gasToken,
      //   options.tokenContractAddress,
      //   signer
      // )
      const targetChain = env[options.networkId]
      // console.log(targetChain.tokens[0].address)
      const token = targetChain.tokens.find((item) => item.address === options.tokenContractAddress)

      const { address: tokenContractAddress, symbol } = token
      await deployZkJumpERC20(
        options.networkId,
        options.gasToken,
        options.tokenContractAddress,
        signer,
        token
      )
      // const promiseAll = []
      // targetChain.tokens.forEach(async (item) => {
      //   await deployZkJumpERC20(options.networkId, options.gasToken, item.address, signer)
      //   // if (targetChain.symbol !== item.symbol) {
      //   //   promiseAll.push(
      //   //     deployZkJumpERC20(options.networkId, options.gasToken, item.address, signer)
      //   //   )
      //   //   // await deployZkJumpERC20(options.networkId, options.gasToken, item.address, signer)
      //   // }
      // })
      // try {
      //   const res = await Promise.all(promiseAll)
      //   console.log(res, 'Successful')
      // } catch (e) {
      //   console.log(e, 'error')
      // }
    }
  })
program.parse()

async function deployZkJumpETH(networkId: string, signer: ethers.Signer, token) {
  let envInstance = env[networkId]
  const { tokens } = envInstance
  // console.log('envInstance===>', env)
  // console.log('envInstance==>', envInstance)
  if (envInstance == undefined) {
    throw new Error('networkId is not exist')
  }

  const ZkJumpETH = await hre.ethers.deployContract('ZkJumpETH', [envInstance.mainContract], signer)

  await ZkJumpETH.waitForDeployment()
  let gasFeeManageAddrss = await ZkJumpETH.getAddress()
  var table = new AsciiTable()
  table.setHeading('Contract Name', 'Contract Address', 'ChainID', 'ChainName')
  table.addRow('ZkJumpETH', gasFeeManageAddrss, envInstance.layerOneChainId, envInstance.name)
  console.log(table.toString())

  // const broker = hre.config.networks[networkId].accounts[1]
  // const res = await ZkJumpETH.grantBroker(BROKER_ADDRESS)
  // var addressTable = new AsciiTable()
  // addressTable.setHeading('Role', 'Address')
  // addressTable.addRow('Sumniter', await signer.getAddress())
  // addressTable.addRow('Broker', BROKER_ADDRESS)
  // console.log(addressTable.toString())
  await appendDataToFile(envInstance.chainId, token, gasFeeManageAddrss)
  await grantBroker(ZkJumpETH, signer)

  let commandStr = ``
  // shell.exec('cd ../')
  // console.log(shell.pwd())
  tokens.forEach((item, index) => {
    if (!index) {
      commandStr += ''
    } else {
      commandStr += ' && '
    }
    commandStr += `npx ts-node --files ${shell.pwd()}/src/cmd.ts deploy -i 1 -c ZkJumpERC20  -g ${gasFeeManageAddrss} -t ${
      item.address
    } `
  })
  // console.log('commandStr==>', commandStr)
  if (shell.exec(commandStr).code === 0) {
    console.log('Successful')
  } else {
    console.log('fail')
  }
  // shell.exec(commandStr, function (code, stdout, stderr) {
  //   console.log('Exit code:', code)
  //   console.log('Program output:', stdout)
  //   console.log('Program stderr:', stderr)
  //   if (code === 0) {
  //     console.log('Successful')
  //     // do something
  //   }
  // })
}

async function deployZkJumpERC20(
  networkId: string,
  gasToken: string,
  tokenContractAddress: string,
  signer: ethers.Signer,
  token: any
) {
  console.log('symbol==>', token.symbol)
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
  table.setHeading('Contract Name', 'Contract Address', 'ChainID', 'ChainName')
  table.addRow('ZkJumpERC20-' + token.symbol, erc20TokenJump, envInstance.chainId, envInstance.name)
  console.log(table.toString())

  // const broker = hre.config.networks[networkId].accounts[1]
  // const res = await ZkJumpERC20.grantBroker(BROKER_ADDRESS)
  // var addressTable = new AsciiTable()
  // addressTable.setHeading('Role', 'Address')
  // addressTable.addRow('Sumniter', await signer.getAddress())
  // addressTable.addRow('Broker', BROKER_ADDRESS)
  // console.log(addressTable.toString())
  await grantBroker(ZkJumpERC20, signer)

  // appendDataToFile()
  await appendDataToFile(envInstance.chainId, token, erc20TokenJump)
}

// async function name(params: type) {
//   // contract.grantBroker
// }

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
  // console.log(staticChainInfo)
}
