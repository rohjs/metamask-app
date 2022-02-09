import type { AbiItem } from 'web3-utils'

export const HOTBODY_TOKEN_ADDRESS =
  '0xf0ed313ba9bd3935182dd952bd14973186769039'
export const HOTBODY_TOKEN_SYMBOL = 'HOTBODY'
export const HOTBODY_TOKEN_DECIMALS = 6

// NOTE: https://eips.ethereum.org/EIPS/eip-20#token
export const ABI: AbiItem[] = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
  // name
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    type: 'function',
  },
  // symbol
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    type: 'function',
  },
  // decimal
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    type: 'function',
  },
]
