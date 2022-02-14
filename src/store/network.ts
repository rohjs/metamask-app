import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '.'

export type ChainId = number | null

type NetworkState = {
  chainId: ChainId
}

const INITIAL_STATE = {
  chainId: null,
}

const networkSlice = createSlice({
  name: '#network',
  initialState: INITIAL_STATE,
  reducers: {
    setChainId: (state: NetworkState, action: PayloadAction<ChainId>) => {
      state.chainId = action.payload
    },
  },
})

export const { setChainId } = networkSlice.actions
export default networkSlice.reducer

export function getChainId(state: RootState) {
  return state.network.chainId
}
