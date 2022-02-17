import { FC, useCallback, useEffect, useMemo } from 'react'
import { ethers } from 'ethers'
import store from 'store'

import { useEthBalance, useHbdBalance, useNetwork } from '../hooks'

export const Effects: FC = () => {
  const { ethereum } = window
  const { address, updateAddress, updateChainId } = useNetwork()

  useEthBalance(address)
  useHbdBalance(address)

  const provider = useMemo(
    () => new ethers.providers.Web3Provider(ethereum),
    [ethereum]
  )

  const handleChainChanged = () => {
    window.location.reload()
  }

  const handleNetworkChange = useCallback(
    (newNetwork: any) => {
      updateChainId(newNetwork.chainId as number)
    },
    [updateChainId]
  )

  const handleAccountsChanged = useCallback(
    (newAccounts: string[]) => {
      const newAccount = newAccounts[0]
      if (newAccount) {
        updateAddress(newAccount)
        return
      }

      store.remove('meta.account')
      window.location.reload()
    },
    [updateAddress]
  )

  useEffect(() => {
    ethereum.on('accountsChanged', handleAccountsChanged)
    return () => {
      ethereum.removeListener('accountsChanged', handleAccountsChanged)
    }
  }, [ethereum, handleAccountsChanged])

  useEffect(() => {
    ethereum.on('chainChanged', handleChainChanged)
    return () => {
      ethereum.removeListener('chainChanged', handleChainChanged)
    }
  }, [ethereum])

  useEffect(() => {
    provider.on('network', handleNetworkChange)
    return () => {
      provider.off('network', handleNetworkChange)
    }
  }, [handleNetworkChange, provider])

  return null
}
