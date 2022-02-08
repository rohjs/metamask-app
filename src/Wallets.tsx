import { useEffect, useState } from 'react'
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
  const tokenInst = new web3.eth.Contract(ABI, HOTBODY_TOKEN_ADDRESS)

  // TODO: 유저가 hotbody token을 임포트 했는지 안했는지 여부를 어떻게 파악할까, 파악할 수 있을까..?
  console.log(tokenInst.defaultAccount)

  const getWallets = async () => {
    const ethBalance = await provider.getBalance(address)
    const formattedEth = ethers.utils.formatEther(ethBalance.toString())

    let formattedHotbody = ''

    try {
      const hotbodyBalance = await tokenInst.methods.balanceOf(address).call()
      const hotbodyDecimals = Number(await tokenInst.methods.decimals().call())
      // const tokenName = await tokenInst.methods.name().call()
      // const tokenSymbol = await tokenInst.methods.symbol().call()

      formattedHotbody = web3.utils.fromWei(
        hotbodyBalance,
        hotbodyDecimals === 6 ? 'mwei' : undefined
      )
    } catch (err) {
      formattedHotbody = 'Not Supported'
    }

    setWallets([
      { name: 'eth', balance: formattedEth },
      { name: 'hotbody', balance: formattedHotbody },
    ])
  }

  const importToken = () => {}

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

      {!tokenInst.defaultAccount && (
        <button onClick={importToken} type="button">
          Add Hotbody to your wallet
        </button>
      )}
    </div>
  )
}
