import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '.'

type BalanceState = {
  eth: string
  hbd: string
}

const INITIAL_STATE: BalanceState = {
  eth: '',
  hbd: '',
}

const balanceSlice = createSlice({
  name: '#balance',
  initialState: INITIAL_STATE,
  reducers: {
    setEth: (state: BalanceState, action: PayloadAction<string>) => {
      state.eth = action.payload
    },
    setHbd: (state: BalanceState, action: PayloadAction<string>) => {
      state.hbd = action.payload
    },
  },
})

export const { setEth, setHbd } = balanceSlice.actions
export default balanceSlice.reducer

export function getEth(state: RootState) {
  return state.balance.eth
}
export function getHbd(state: RootState) {
  return state.balance.hbd
}
