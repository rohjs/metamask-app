import { FC, lazy, Suspense } from 'react'

import { useEthBalance, useHbdBalance, useNetwork } from '../hooks'

import { ClaimHotbody } from './ClaimHotbody'
import { ImportToken } from './ImportToken'

type WalletsProps = {
  address: string
}

const WalletList = lazy(() => import('./WalletList'))

export const Wallets: FC<WalletsProps> = ({ address }) => {
  const ethBalance = useEthBalance()
  const hbdBalance = useHbdBalance()

  const { isGoerli } = useNetwork()

  return (
    <div>
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <WalletList ethBalance={ethBalance} hbdBalance={hbdBalance} />
      </Suspense>

      {isGoerli && (
        <>
          <ImportToken />
          <ClaimHotbody address={address} />
        </>
      )}
    </div>
  )
}
