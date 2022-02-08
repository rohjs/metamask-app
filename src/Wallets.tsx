import { useEffect, useState } from 'react'
import Web3 from 'web3'
import type { AbiItem } from 'web3-utils'
import { ethers } from 'ethers'

import { HOTBODY_TOKEN_ADDRESS } from './constants'

const minABI: AbiItem[] = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
]

type WalletsProps = {
  address: string
}

export const Wallets = ({ address }: WalletsProps) => {
  const [wallets, setWallets] = useState<WalletBalance[]>([])

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const web3 = new Web3(Web3.givenProvider)
  const contract = new web3.eth.Contract(minABI, HOTBODY_TOKEN_ADDRESS)

  const getWallets = async () => {
    const ethBalance = await provider.getBalance(address)
    const formattedEth = ethers.utils.formatEther(ethBalance.toString())

    const hotbodyBalance = await contract.methods.balanceOf(address).call()
    const formattedHotbody = web3.utils.fromWei(hotbodyBalance, 'mwei')

    setWallets([
      { name: 'eth', balance: formattedEth },
      { name: 'hotbody', balance: formattedHotbody },
    ])
  }

  useEffect(() => {
    getWallets()
  }, [])

  return (
    <ul className="walletList">
      {wallets.map(({ name, balance }) => (
        <li key={`wallet-${name}`}>
          <span>{name.toUpperCase()}</span>
          <strong>{balance}</strong>
        </li>
      ))}
    </ul>
  )
}
