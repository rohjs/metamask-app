import { FC } from 'react'

type WalletListProps = {
  ethBalance: string
  hbdBalance: string
  isGoerli: boolean
}

const WalletList: FC<WalletListProps> = ({
  ethBalance,
  hbdBalance,
  isGoerli,
}) => {
  return (
    <ul className="walletList">
      <li>
        <span>ETH</span>
        <strong>{ethBalance}</strong>
      </li>

      <li>
        <span>HOTBODY</span>
        <strong>{isGoerli ? hbdBalance : 'Not Supported'}</strong>
      </li>
    </ul>
  )
}

export default WalletList
