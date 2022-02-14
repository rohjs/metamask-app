import { FC } from 'react'
import { useModal } from '../../hooks'
import { ModalType } from '../../types/modal.d'

type ErrorModalProps = {
  message?: string
}

const DEFAULT_MESSAGE = '😱 Oops! Something went wrong'

export const ErrorModal: FC<ErrorModalProps> = ({ message }) => {
  const { removeModal } = useModal()
  const closeModal = () => {
    removeModal(ModalType.Error)
  }

  return (
    <aside>
      <h1>{message || DEFAULT_MESSAGE}</h1>
      <button onClick={closeModal} type="button">
        Okay
      </button>
    </aside>
  )
}
