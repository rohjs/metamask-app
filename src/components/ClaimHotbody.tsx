import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import cx from 'classnames'

import { useModal } from '../hooks'
import { ModalType } from '../types/modal.d'

type ClaimHotbodyProps = {
  address: string
}

export const ClaimHotbody: FC<ClaimHotbodyProps> = ({ address }) => {
  const [showModal, setShowModal] = useState(false)
  const [amount, setAmount] = useState<number | string>('')
  const modalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { addModal } = useModal()

  const openClaimModal = () => {
    setShowModal(true)
    inputRef?.current?.focus()
  }

  const closeAndResetClaimModal = () => {
    setShowModal(false)
    setAmount('')
  }

  const closeClaimModalOnBlur = (e: MouseEvent) => {
    if (!modalRef?.current?.contains(e.target as Node)) {
      closeAndResetClaimModal()
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    if (!value) {
      setAmount('')
      return
    }

    let newValue = parseInt(value, 10)
    if (newValue < 1) newValue = 1
    if (newValue > 1000) newValue = 1000
    setAmount(newValue)
  }

  const sendSlackMessage = async () => {
    const payload = {
      channel: 'C032C75GJE8',
      text: `*PLEASE SEND HOTBODY*:\n⚡️ to: \`${address}\`\n💸 amount: *${amount.toLocaleString()}*`,
    }

    try {
      await axios.post(`${process.env.REACT_APP_SLACK_WEBHOOK}`, payload, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
    } catch (error) {
      addModal({ type: ModalType.Error })
    }

    closeAndResetClaimModal()
  }

  useEffect(() => {
    if (!showModal) return
    window.addEventListener('click', closeClaimModalOnBlur)

    return () => {
      window.removeEventListener('click', closeClaimModalOnBlur)
    }
  })

  if (!address) return null

  return (
    <div className="walletGuide">
      <h3>Need $HOTBODY? 💰</h3>

      <div className="claimHotbody" ref={modalRef}>
        <button
          className="secondary-button"
          onClick={openClaimModal}
          type="button"
        >
          Claim HOTBODY 💸
        </button>

        <div className={cx('claimModal', { show: showModal })}>
          <input
            ref={inputRef}
            onChange={handleChange}
            value={amount}
            type="number"
            max={1000}
            placeholder="Min 1 / Max 1000"
          />
          <button onClick={sendSlackMessage} disabled={!amount} type="button">
            Claim
          </button>
        </div>
      </div>
    </div>
  )
}
