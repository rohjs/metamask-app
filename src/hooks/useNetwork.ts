import { getChainId, setChainId } from '../store/network'
import { useAppDispatch, useAppSelector } from '.'
import { useMemo } from 'react'

export const useNetwork = () => {
  const dispatch = useAppDispatch()
  const chainId = useAppSelector(getChainId)

  const isGoerli = useMemo(() => chainId === 5, [chainId])

  const updateChainId = (id?: number) => {
    const newChainId = id || null
    dispatch(setChainId(newChainId))
  }

  return {
    chainId,
    updateChainId,
    isGoerli,
  }
}
