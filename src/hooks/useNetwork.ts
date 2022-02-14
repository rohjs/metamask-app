import { getChainId, setChainId } from '../store/network'
import { useAppDispatch, useAppSelector } from '.'

export const useNetwork = () => {
  const dispatch = useAppDispatch()
  const chainId = useAppSelector(getChainId)

  const updateChainId = (id?: number) => {
    const newChainId = id || null
    dispatch(setChainId(newChainId))
  }

  return {
    chainId,
    updateChainId,
  }
}
