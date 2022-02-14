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
      <ul>
        {modals.slice(0, 4).map((modal, i) => (
          <li key={`${modal.type}.${i}`}>
            <ModalView modal={modal} />
          </li>
        ))}
      </ul>
    </ModalPortal>
  )
}
