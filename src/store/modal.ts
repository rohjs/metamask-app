import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '.'
import type { Modal } from '../types/modal'

type ModalState = {
  modals: Modal[]
}

const INITIAL_STATE: ModalState = {
  modals: [],
}

const modalSlice = createSlice({
  name: '#modal',
  initialState: INITIAL_STATE,
  reducers: {
    addModal: (state: ModalState, action: PayloadAction<Modal>) => {
      state.modals.push(action.payload)
    },

    removeModal: (
      state: ModalState,
      action: PayloadAction<string | undefined>
    ) => {
      if (!action.payload) {
        state.modals.unshift()
        return
      }

      const matchIndex = state.modals.findIndex(
        (modal) => modal.type === action.payload
      )

      if (matchIndex > -1) {
        state.modals.splice(matchIndex, 1)
      }
    },
  },
})

export const { addModal, removeModal } = modalSlice.actions
export default modalSlice.reducer

export function getModals(state: RootState) {
  return state.modal.modals
}
