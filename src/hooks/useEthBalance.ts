import { ethers } from 'ethers'
import { useCallback, useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector, usePrevious } from '.'
import { getEth, setEth } from '../store/balance'

// NOTE: https://medium.com/@clashofcoins/how-to-fetch-eth-balance-in-react-with-hooks-89e48ed6e842
export const useEthBalance = () => {
  const dispatch = useAppDispatch()
  const balance = useAppSelector(getEth)
  const prevBalance = usePrevious(balance)

  const provider = useMemo(
    () => new ethers.providers.Web3Provider(window.ethereum),
    []
  )
  const signer = provider.getSigner()

  const fetchBalance = useCallback(async () => {
    const address = await signer.getAddress()
    const rawBalance = await provider.getBalance(address)
    const value = ethers.utils.formatEther(rawBalance)

    if (prevBalance !== value) {
      dispatch(setEth(value))
    }
  }, [dispatch, prevBalance, provider, signer])

  useEffect(() => {
    fetchBalance()
  }, [fetchBalance])

  useEffect(() => {
    provider.on('block', fetchBalance)
    return () => {
      provider.off('block', fetchBalance)
    }
  }, [fetchBalance, provider])
}
