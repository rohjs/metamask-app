import { ethers } from 'ethers'
import { FC, useEffect } from 'react'

type EffectsProps = {
  updateAddress: (newAcccount: string) => void
}

export const Effects: FC<EffectsProps> = ({ updateAddress }) => {
  const { ethereum } = window
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')

  const handleNetworkChange = (_: string, oldNetwork: string) => {
    // NOTE: window.ethereum.on('chainChanged')가 더 빠른듯
    if (oldNetwork) {
      window.location.reload()
    }
  }

  const handleAccountsChanged = (newAccounts: string[]) => {
    const newAccount = newAccounts[0]
    updateAddress(newAccount)
  }

  useEffect(() => {
    ethereum.on('accountsChanged', handleAccountsChanged)
    provider.on('network', handleNetworkChange)

    return () => {
      ethereum.removeListener('accountsChanged', handleAccountsChanged)
      provider.off('network', handleNetworkChange)
    }
  }, [])

  return null
}
