import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import store from 'store'

import type { RootState } from '.'

export type ChainId = number | null

type NetworkState = {
  address: string
  chainId: ChainId
}

const INITIAL_STATE = {
  address: store.get(`meta.account`) || '',
  chainId: null,
}

const networkSlice = createSlice({
  name: '#network',
  initialState: INITIAL_STATE,
  reducers: {
    setAddress: (state: NetworkState, action: PayloadAction<string>) => {
      state.address = action.payload
      store.set(`meta.account`, action.payload)
    },
    setChainId: (state: NetworkState, action: PayloadAction<ChainId>) => {
      state.chainId = action.payload
    },
  },
})

export const { setAddress, setChainId } = networkSlice.actions
export default networkSlice.reducer

export function getAddress(state: RootState) {
  return state.network.address
}
export function getChainId(state: RootState) {
  return state.network.chainId
}
