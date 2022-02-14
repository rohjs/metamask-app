import { FC } from 'react'

import { useModal, useNetwork } from '../../hooks'
import { ModalType } from '../../types/modal.d'

type TransactionSubmittedModalProps = {
  txid: string
}

export const TransactionSubmittedModal: FC<TransactionSubmittedModalProps> = ({
  txid,
}) => {
  const { isGoerli } = useNetwork()
  const { removeModal } = useModal()
  const closeModal = () => {
    removeModal(ModalType.TransactionSubmitted)
  }

  const txidUrl = `https://${isGoerli ? 'goerli.' : ''}etherscan.io/tx/${txid}`

  return (
    <aside>
      <h1>🎉 Successfully submitted!</h1>
      <div className="buttonGroup">
        <a href={txidUrl} target="_blank" rel="noreferrer">
          {txid.slice(0, 6)}
        </a>
        <button onClick={closeModal} type="button">
          Okay
        </button>
      </div>
    </aside>
  )
}
