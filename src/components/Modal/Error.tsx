import { useModal } from '../../hooks'
import { ModalType } from '../../types/modal.d'

export const ErrorModal = () => {
  const { removeModal } = useModal()
  const closeModal = () => {
    removeModal(ModalType.Error)
  }

  return (
    <aside>
      <h1>😱 Oops! Something went wrong</h1>
      <button onClick={closeModal} type="button">
        Okay
      </button>
    </aside>
  )
}
