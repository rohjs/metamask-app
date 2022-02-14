import { FC, useEffect, useState } from 'react'
import { ethers } from 'ethers'

import { useNetwork } from '../hooks'
import { ETHERS_ABI, HOTBODY_TOKEN_ADDRESS } from '../constants'

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
  const hotbodyContract = new ethers.Contract(
    HOTBODY_TOKEN_ADDRESS,
    ETHERS_ABI,
    provider
  )

  const getWallets = async () => {
    const ethBalance = await provider.getBalance(address)
    const ethAmount = ethers.utils.formatEther(ethBalance.toString())

    let hbdAmount = ''

    try {
      const hbdBalance = await hotbodyContract.balanceOf(address)
      hbdAmount = ethers.utils.formatUnits(hbdBalance, 'mwei').split('.')[0]
    } catch (err) {
      hbdAmount = 'Not Supported'
    }

    setWallets([
      { name: 'eth', balance: ethAmount },
      { name: 'hotbody', balance: hbdAmount },
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
