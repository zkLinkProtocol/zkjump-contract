import { writeFileSync } from 'node:fs'
import { JSONRPCClient } from 'json-rpc-2.0'
import { join, dirname } from 'path'
import { BLOCK_TOKENS, BROKER_ADDRESS, ENV_INFO_URL } from './constant'
import { format } from 'prettier'
import AsciiTable from 'ascii-table'
import { readFileSync } from 'fs'

export const isLpToken = function (tokenId: number) {
  if (tokenId === undefined || tokenId === null || Number.isNaN(Number(tokenId))) {
    return false
  }
  return tokenId >= 2 && tokenId <= 16
}
export const getRPCClient = (envName: string) => {
  let url = ENV_INFO_URL[envName]
  if (!url) {
    return Promise.reject(new Error('unknown env name : ' + envName))
  }
  const client = new JSONRPCClient((jsonRPCRequest) =>
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(jsonRPCRequest),
    }).then((response) => {
      if (response.status === 200) {
        return response.json().then((jsonRPCResponse) => client.receive(jsonRPCResponse))
      } else if (jsonRPCRequest.id !== undefined) {
        return Promise.reject(new Error(response.statusText))
      }
    })
  )
  return client
}

export const handleSupportChainsData = ({ staticChainInfo, supportChains, supportTokens }) => {
  staticChainInfo.forEach((item) => {
    const { layerTwoChainId, name, symbol, rpcUrl } = item
    supportChains.forEach((v) => {
      const { chainId } = v
      if (layerTwoChainId === chainId) {
        v.name = name
        v.symbol = symbol
        v.rpcUrl = rpcUrl
      }
    })
  })
  // // console.log('staticChainInfo==>', staticChainInfo)
  supportTokens = Object.values(supportTokens)
  supportTokens = supportTokens.filter((token) => !isLpToken(token.id!))
  supportTokens = supportTokens.filter((token) => !BLOCK_TOKENS.includes(token.symbol!))
  // console.log('supportChains==>', supportChains)
  // // console.log('supportTokens===>', supportTokens)
  supportChains.forEach((item) => {
    const { chainId } = item
    let tokens = []
    for (let key in supportTokens) {
      const token = supportTokens[key]
      const { id, symbol } = token
      const tokenInChainInfo = token.chains[chainId]
      if (tokenInChainInfo) {
        tokens.push({ id, symbol, ...tokenInChainInfo })
      }
    }
    item.tokens = tokens
  })
  return supportChains
}
export const createSupportChainsFile = (supportChains) => {
  writeFileSync(
    join(dirname(__dirname), 'etc/env.ts'),
    format('export default ' + JSON.stringify(supportChains), {
      semi: false,
      parser: 'babel',
    }),
    {
      encoding: 'utf8',
      flag: 'w',
    }
  )
}
export const fetchApi = async (url) => {
  return fetch(url)
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      return res
    })
}

export const grantBroker = async (contract, signer) => {
  const res = await contract.grantBroker(BROKER_ADDRESS)
  var addressTable = new AsciiTable()
  addressTable.setHeading('Role', 'Address')
  addressTable.addRow('Submiter', await signer.getAddress())
  addressTable.addRow('Broker', BROKER_ADDRESS)
  console.log(addressTable.toString())
}

export const appendDataToFile = async (chainId, token, contractAddress) => {
  const contractPath = __dirname + '/../etc/contract.json'
  const { symbol } = token
  const fileBuf = readFileSync(contractPath).toString()
  const fileJson = JSON.parse(fileBuf)
  if (!fileJson[chainId]) {
    fileJson[chainId] = {}
  }
  fileJson[chainId][symbol] = { pridgeAddress: contractAddress, ...token }
  writeFileSync(contractPath, JSON.stringify(fileJson))
}
