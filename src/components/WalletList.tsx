import { FC } from 'react'

type WalletListProps = {
  ethBalance: string
  hbdBalance: string | null
}

const WalletList: FC<WalletListProps> = ({ ethBalance, hbdBalance }) => {
  return (
    <ul className="walletList">
      <li>
        <span>ETH</span>
        <strong>{ethBalance}</strong>
      </li>

      <li>
        <span>HOTBODY</span>
        <strong>{hbdBalance || 'Not Supported'}</strong>
      </li>
    </ul>
  )
}

export default WalletList
