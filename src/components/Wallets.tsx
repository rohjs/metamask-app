import { FC, lazy, Suspense } from 'react'

import { useAppSelector, useNetwork } from '../hooks'
import { getEth, getHbd } from '../store/balance'

import { ClaimHotbody } from './ClaimHotbody'
import { ImportToken } from './ImportToken'

type WalletsProps = {
  address: string
}

const WalletList = lazy(() => import('./WalletList'))

export const Wallets: FC<WalletsProps> = ({ address }) => {
  const ethBalance = useAppSelector(getEth)
  const hbdBalance = useAppSelector(getHbd)

  const { isGoerli } = useNetwork()

  return (
    <div>
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <WalletList
          ethBalance={ethBalance}
          hbdBalance={hbdBalance}
          isGoerli={isGoerli}
        />
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
