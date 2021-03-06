import { ethers } from 'ethers'
import { useCallback, useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector, usePrevious } from '.'
import { ETHERS_ABI, HOTBODY_TOKEN_ADDRESS } from '../constants'
import { getHbd, setHbd } from '../store/balance'
import { getChainId } from '../store/network'

export const useHbdBalance = (address: string) => {
  const dispatch = useAppDispatch()
  const balance = useAppSelector(getHbd)
  const prevBalance = usePrevious(balance)
  const chainId = useAppSelector(getChainId)

  const provider = useMemo(
    () => new ethers.providers.Web3Provider(window.ethereum),
    []
  )

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

    const rawBalance = await contract?.balanceOf(address)
    const value = ethers.utils.formatUnits(rawBalance, 'mwei').split('.')[0]

    if (prevBalance !== value) {
      dispatch(setHbd(value))
    }
  }, [address, chainId, contract, dispatch, prevBalance])

  useEffect(() => {
    fetchBalance()
  }, [fetchBalance])

  useEffect(() => {
    contract?.on('Transfer', fetchBalance)
    return () => {
      contract?.off('Transfer', fetchBalance)
    }
  }, [contract, fetchBalance])
}
