import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store'

export { useEthBalance } from './useEthBalance'
export { useHbdBalance } from './useHbdBalance'
export { useModal } from './useModal'
export { useMount } from './useMount'
export { useNetwork } from './useNetwork'
export { usePrevious } from './usePrevious'
export { useTransfer } from './useTransfer'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
