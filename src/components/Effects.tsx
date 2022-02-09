import { FC, useEffect } from 'react'
import store from 'store'

type EffectsProps = {
  updateAddress: (newAcccount: string) => void
}

export const Effects: FC<EffectsProps> = ({ updateAddress }) => {
  const { ethereum } = window

  const handleChainChanged = () => {
    window.location.reload()
  }

  const handleAccountsChanged = (newAccounts: string[]) => {
    const newAccount = newAccounts[0]
    if (newAccount) updateAddress(newAccount)
    else {
      store.remove('meta.account')
      window.location.reload()
    }
  }

  useEffect(() => {
    ethereum.on('accountsChanged', handleAccountsChanged)
    // NOTE: provider.on('network', handleChainChanged)도 가능하지만 느림
    ethereum.on('chainChanged', handleChainChanged)

    return () => {
      ethereum.removeListener('accountsChanged', handleAccountsChanged)
      ethereum.removeListener('chainChanged', handleChainChanged)
    }
  }, [])

  return null
}
