import { useModal } from '../../hooks'
import { ModalType } from '../../types/modal.d'

export const TransactionCanceledModal = () => {
  const { removeModal } = useModal()
  const closeModal = () => {
    removeModal(ModalType.TransactionCanceled)
  }

  return (
    <aside>
      <h1>🥲 You rejected the transaction</h1>
      <button onClick={closeModal} type="button">
        Okay
      </button>
    </aside>
  )
}
