import { useCallback, useEffect, useState } from 'react'
import Web3 from 'web3'
import { ethers } from 'ethers'

import { HOTBODY_TOKEN_ADDRESS, ABI } from './constants'

type WalletsProps = {
  address: string
}

export const Wallets = ({ address }: WalletsProps) => {
  const [wallets, setWallets] = useState<WalletBalance[]>([])

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const web3 = new Web3(Web3.givenProvider)
  const contract = new web3.eth.Contract(ABI, HOTBODY_TOKEN_ADDRESS)

  const getWallets = async () => {
    const ethBalance = await provider.getBalance(address)
    const formattedEth = ethers.utils.formatEther(ethBalance.toString())

    let formattedHotbody = ''

    try {
      const hotbodyBalance = await contract.methods.balanceOf(address).call()
      formattedHotbody = web3.utils.fromWei(hotbodyBalance, 'mwei')
    } catch (err) {
      formattedHotbody = 'Not Supported'
    }

    setWallets([
      { name: 'eth', balance: formattedEth },
      { name: 'hotbody', balance: formattedHotbody },
    ])
  }

  useEffect(() => {
    getWallets()
  }, [address])

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
