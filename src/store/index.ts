import { configureStore } from '@reduxjs/toolkit'

import modalReducer from './modal'
import networkReducer from './network'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    network: networkReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
