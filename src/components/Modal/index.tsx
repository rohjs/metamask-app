import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { useAppSelector } from '../../hooks'
import { getModals } from '../../store/modal'

import { ModalView } from './View'

type ModalProps = {
  children: ReactNode
}

const ModalPortal = ({ children }: ModalProps) =>
  createPortal(children, document.getElementById('modal')!)

export const Modal = () => {
  const modals = useAppSelector(getModals)

  if (!modals.length) {
    return null
  }

  return (
    <ModalPortal>
      {modals.map((modal) => (
        <ModalView key={modal.type} modal={modal} />
      ))}
    </ModalPortal>
  )
}
