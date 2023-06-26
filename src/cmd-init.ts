import { Command, Option } from 'commander'
import { JSONRPCClient } from 'json-rpc-2.0'
import fetch from 'node-fetch'
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'path'
import { format } from 'prettier'
import AsciiTable from 'ascii-table'
import hre from 'hardhat'
import type * as ethers from 'ethers'

import { ENV_INFO_URL, BLOCK_TOKENS, ZKLINK_NETWORK_API } from './constant'
import {
  createSupportChainsFile,
  fetchApi,
  getRPCClient,
  handleSupportChainsData,
  isLpToken,
} from './utils'
let envNameOption = new Option('-e, --env-name <envName>', 'Env Name').choices([
  'mainnet',
  'devnet',
  'testnet',
])
const program = new Command()
program.version('0.0.1')
program
  .command('init')
  .description('')
  .addOption(envNameOption)
  .action(async (options) => {
    await init(options.envName)
  })
program.parse()

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
  console.log(supportChains.map((item) => item.chainId).join(' '))
  createSupportChainsFile(supportChains)
  console.log('Successful initialization.')
}
