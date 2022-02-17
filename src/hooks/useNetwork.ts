import {
  getAddress,
  getChainId,
  setAddress,
  setChainId,
} from '../store/network'
import { useAppDispatch, useAppSelector } from '.'
import { useMemo } from 'react'

export const useNetwork = () => {
  const dispatch = useAppDispatch()
  const address = useAppSelector(getAddress)
  const chainId = useAppSelector(getChainId)

  const isGoerli = useMemo(() => chainId === 5, [chainId])

  const updateAddress = (addr?: string) => {
    if (!addr) return
    dispatch(setAddress(addr))
  }

  const updateChainId = (id?: number) => {
    const newChainId = id || null
    dispatch(setChainId(newChainId))
  }

  return {
    address,
    updateAddress,
    chainId,
    updateChainId,
    isGoerli,
  }
}
