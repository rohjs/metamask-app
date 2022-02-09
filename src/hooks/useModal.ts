import type { Modal } from '../types/modal'
import { addModal, removeModal } from '../store/modal'
import { useAppDispatch } from '.'

export const useModal = () => {
  const dispatch = useAppDispatch()

  const addModalDispatch = (modal: Modal) => {
    dispatch(addModal(modal))
  }

  const removeModalDispatch = (modalType?: string) => {
    dispatch(removeModal(modalType))
  }

  return {
    addModal: addModalDispatch,
    removeModal: removeModalDispatch,
  }
}
