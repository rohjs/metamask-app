import type { AbiItem } from 'web3-utils'

export const HOTBODY_TOKEN_ADDRESS =
  '0xf0ed313ba9bd3935182dd952bd14973186769039'

export const ABI: AbiItem[] = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
]
