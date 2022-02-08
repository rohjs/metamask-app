import { FC, useEffect } from 'react'

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
    updateAddress(newAccount)
  }

  useEffect(() => {
    ethereum.on('accountsChanged', handleAccountsChanged)
    ethereum.on('chainChanged', handleChainChanged)

    return () => {
      ethereum.removeListener('accountsChanged', handleAccountsChanged)
      ethereum.removeListener('chainChanged', handleChainChanged)
    }
  }, [])

  return null
}
