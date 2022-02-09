import { FC } from 'react'

import type { Modal } from '../../types/modal'

import { ErrorModal } from './Error'
import { ImportTokenFailModal } from './ImportTokenFail'
import { ImportTokenSuccessModal } from './ImportTokenSuccess'
import { TransactionCanceledModal } from './TransactionCanceled'
import { TransactionSubmittedModal } from './TransactionSubmitted'

type ModalViewProps = {
  modal: Modal
}

export const ModalView: FC<ModalViewProps> = ({ modal }) => {
  switch (modal.type) {
    case 'Error':
      return <ErrorModal {...modal.props} />
    case 'ImportTokenFail':
      return <ImportTokenFailModal {...modal.props} />
    case 'ImportTokenSuccess':
      return <ImportTokenSuccessModal {...modal.props} />
    case 'TransactionCanceled':
      return <TransactionCanceledModal {...modal.props} />
    case 'TransactionSubmitted':
      return <TransactionSubmittedModal {...modal.props} />
    default:
      return null
  }
}
