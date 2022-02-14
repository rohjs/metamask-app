import { FC, useEffect } from 'react'
import { ethers } from 'ethers'
import store from 'store'

import { useNetwork } from '../hooks'

type EffectsProps = {
  updateAddress: (newAcccount: string) => void
}

export const Effects: FC<EffectsProps> = ({ updateAddress }) => {
  const { ethereum } = window
  const provider = new ethers.providers.Web3Provider(ethereum)

  const { updateChainId } = useNetwork()

  const handleChainChanged = () => {
    window.location.reload()
  }

  const handleNetworkChange = (newNetwork: any) => {
    updateChainId(newNetwork.chainId as number)
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
    ethereum.on('chainChanged', handleChainChanged)
    provider.on('network', handleNetworkChange)

    return () => {
      ethereum.removeListener('accountsChanged', handleAccountsChanged)
      ethereum.removeListener('chainChanged', handleChainChanged)
      provider.off('network', handleNetworkChange)
    }
  }, [])

  return null
}
