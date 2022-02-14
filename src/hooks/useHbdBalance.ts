import { ethers } from 'ethers'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAppSelector, usePrevious } from '.'
import { ETHERS_ABI, HOTBODY_TOKEN_ADDRESS } from '../constants'
import { getChainId } from '../store/network'

export const useHbdBalance = () => {
  const [balance, setBalance] = useState<string | null>(null)
  const prevBalance = usePrevious(balance)
  const chainId = useAppSelector(getChainId)

  const provider = useMemo(
    () => new ethers.providers.Web3Provider(window.ethereum),
    []
  )
  const signer = provider.getSigner()

  const contract = useMemo(() => {
    if (chainId === 5) {
      return new ethers.Contract(HOTBODY_TOKEN_ADDRESS, ETHERS_ABI, provider)
    }
    return null
  }, [chainId, provider])

  const fetchBalance = useCallback(async () => {
    if (chainId !== 5) {
      return null
    }

    const address = await signer.getAddress()
    const rawBalance = await contract?.balanceOf(address)
    const value = ethers.utils.formatUnits(rawBalance, 'mwei').split('.')[0]

    if (prevBalance !== value) {
      setBalance(value)
    }
  }, [chainId, contract, prevBalance, signer])

  useEffect(() => {
    fetchBalance()
  }, [fetchBalance])

  useEffect(() => {
    contract?.on('Transfer', fetchBalance)
    return () => {
      contract?.off('Transfer', fetchBalance)
    }
  }, [contract, fetchBalance])

  return balance
}
