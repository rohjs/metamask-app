import { FC, useEffect, useState } from 'react'
import Web3 from 'web3'
import { ethers } from 'ethers'

import { useNetwork } from '../hooks'
import { ABI, HOTBODY_TOKEN_ADDRESS } from '../constants'

import { ClaimHotbody } from './ClaimHotbody'
import { ImportToken } from './ImportToken'

type WalletsProps = {
  address: string
}

export const Wallets: FC<WalletsProps> = ({ address }) => {
  const [wallets, setWallets] = useState<WalletBalance[]>([])

  const { ethereum } = window
  const { isGoerli } = useNetwork()

  const provider = new ethers.providers.Web3Provider(ethereum)
  const web3 = new Web3(Web3.givenProvider)
  const tokenInst = new web3.eth.Contract(ABI, HOTBODY_TOKEN_ADDRESS)

  const getWallets = async () => {
    const ethBalance = await provider.getBalance(address)
    const ethAmount = ethers.utils.formatEther(ethBalance.toString())

    let hotbodyAmount = ''

    try {
      const hotbodyBalance = await tokenInst.methods.balanceOf(address).call()
      const hotbodyDecimals = Number(await tokenInst.methods.decimals().call())

      hotbodyAmount = web3.utils.fromWei(
        hotbodyBalance,
        hotbodyDecimals === 6 ? 'mwei' : undefined
      )
    } catch (err) {
      hotbodyAmount = 'Not Supported'
    }

    setWallets([
      { name: 'eth', balance: ethAmount },
      { name: 'hotbody', balance: hotbodyAmount },
    ])
  }

  useEffect(() => {
    getWallets()
  }, [address])

  return (
    <div>
      {wallets.length ? (
        <ul className="walletList">
          {wallets.map(({ name, balance }) => {
            if (balance) {
              return (
                <li key={`wallet-${name}`}>
                  <span>{name.toUpperCase()}</span>
                  <strong>{balance}</strong>
                </li>
              )
            } else {
              return null
            }
          })}
        </ul>
      ) : (
        <div className="loading">Loading...</div>
      )}

      {isGoerli && (
        <>
          <ImportToken />
          <ClaimHotbody address={address} />
        </>
      )}
    </div>
  )
}
