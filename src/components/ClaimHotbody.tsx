import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import cx from 'classnames'

import { useModal } from '../hooks'
import { ModalType } from '../types/modal.d'

type ClaimHotbodyProps = {
  address: string
}

export const ClaimHotbody: FC<ClaimHotbodyProps> = ({ address }) => {
  const [showPopup, setShowPopup] = useState(false)
  const [amount, setAmount] = useState<number | string>('')
  const popupRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { addModal } = useModal()

  const openclaimPopup = () => {
    setShowPopup(true)
    inputRef?.current?.focus()
  }

  const closeAndResetclaimPopup = () => {
    setShowPopup(false)
    setAmount('')
  }

  const closeclaimPopupOnBlur = (e: MouseEvent) => {
    if (!popupRef?.current?.contains(e.target as Node)) {
      closeAndResetclaimPopup()
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

    closeAndResetclaimPopup()
  }

  useEffect(() => {
    if (!showPopup) return
    window.addEventListener('click', closeclaimPopupOnBlur)

    return () => {
      window.removeEventListener('click', closeclaimPopupOnBlur)
    }
  })

  if (!address) return null

  return (
    <div className="walletGuide">
      <h3>Need $HOTBODY? 💰</h3>

      <div className="claimHotbody" ref={popupRef}>
        <button
          className="secondaryButton"
          onClick={openclaimPopup}
          type="button"
        >
          Claim HOTBODY 💸
        </button>

        <div className={cx('claimPopup', { show: showPopup })}>
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
