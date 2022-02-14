import { configureStore } from '@reduxjs/toolkit'

import balanceReducer from './balance'
import modalReducer from './modal'
import networkReducer from './network'

export const store = configureStore({
  reducer: {
    balance: balanceReducer,
    modal: modalReducer,
    network: networkReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
