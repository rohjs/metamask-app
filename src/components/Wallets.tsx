import { useEffect, useState } from 'react'
import Web3 from 'web3'
import { ethers } from 'ethers'

import {
  ABI,
  HOTBODY_TOKEN_ADDRESS,
  HOTBODY_TOKEN_DECIMALS,
  HOTBODY_TOKEN_SYMBOL,
} from '../constants'

type WalletsProps = {
  address: string
}

export const Wallets = ({ address }: WalletsProps) => {
  const [wallets, setWallets] = useState<WalletBalance[]>([])

  const { ethereum } = window
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
      // const tokenName = await tokenInst.methods.name().call()
      // const tokenSymbol = await tokenInst.methods.symbol().call()

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

  const importToken = async () => {
    await ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: HOTBODY_TOKEN_ADDRESS,
          symbol: HOTBODY_TOKEN_SYMBOL,
          decimals: HOTBODY_TOKEN_DECIMALS,
        },
      },
    })
  }

  useEffect(() => {
    getWallets()
  }, [address])

  return (
    <div>
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

      <div className="walletGuide">
        <h3>
          Can't find $HOTBODY
          <br />
          in your wallet? 🥲
        </h3>
        <button className="outlined-button" onClick={importToken} type="button">
          Import $HOTBODY 🚀
        </button>
      </div>
    </div>
  )
}
