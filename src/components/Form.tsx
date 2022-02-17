import { ChangeEvent, FC, FocusEvent, FormEvent, useState } from 'react'
import { FixedNumber } from 'ethers'
import { isAddress } from 'ethers/lib/utils'
import cx from 'classnames'

import { useNetwork, useTransfer } from '../hooks'

type FormProps = {
  address: string
}

type FormError = {
  address: boolean
  amount: boolean
}

const INITIAL_ERROR: FormError = {
  address: false,
  amount: false,
}

export const Form: FC<FormProps> = () => {
  const [error, setError] = useState<FormError>(INITIAL_ERROR)

  const { address, isGoerli } = useNetwork()
  const { transferEth, transferHbd } = useTransfer(address)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const tokenType = e.currentTarget.tokenType.value
    const receiver = e.currentTarget.toAddress.value
    const rawAmount = e.currentTarget.amount.value

    if (!isAddress(receiver)) {
      alert('Invalid Address!')
      return
    }

    if (!rawAmount) {
      alert('Invalid Amount')
      return
    }

    // NOTE: 이거 체크
    const amount = FixedNumber.fromString(rawAmount).toHexString()
    const params = { receiver, amount }

    if (tokenType === 'ETH') transferEth(params)
    else transferHbd(params)
  }

  const validateInput = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    if (name === 'toAddress') {
      if (!isAddress(value)) {
        setError((prev) => ({ ...prev, address: true }))
      }
      return
    }

    if (!value || isNaN(Number(value))) {
      setError((prev) => ({ ...prev, amount: true }))
    }
  }

  const resetError = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget
    if (name === 'toAddress') {
      if (error.address) {
        setError((prev) => ({ ...prev, address: false }))
      }
      return
    }

    if (error.amount) {
      setError((prev) => ({ ...prev, amount: false }))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <select name="tokenType">
        <option value="ETH">ETH</option>
        <option value="HOTBODY" disabled={!isGoerli}>
          HOTBODY
        </option>
      </select>

      <input
        className={cx({ error: error.address })}
        type="text"
        name="toAddress"
        onChange={resetError}
        onBlur={validateInput}
        placeholder="Address"
      />
      {error.address && <p className="errorMessage">🚨 Invalid address</p>}
      <input
        className={cx({ error: error.amount })}
        type="text"
        pattern="[-+]?[0-9]*[.,]?[0-9]+"
        name="amount"
        onChange={resetError}
        onBlur={validateInput}
        placeholder="Amount"
      />
      {error.amount && <p className="errorMessage">🚨 Invalid amount</p>}
      <button type="submit">Send</button>
    </form>
  )
}
