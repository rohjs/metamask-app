import { FormEvent } from 'react'
import { FixedNumber } from 'ethers'
import { isAddress } from 'ethers/lib/utils'

import { useModal } from '../hooks'
import { ModalType } from '../types/modal.d'

type FormProps = {
  address: string
}

export const Form = ({ address }: FormProps) => {
  const { addModal } = useModal()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const amount = FixedNumber.fromString(
      e.currentTarget.amount.value
    ).toHexString()
    const toAddress = e.currentTarget.toAddress.value

    if (!isAddress(toAddress)) {
      alert('Invalid Address!')
      return
    }

    const params = {
      from: address,
      to: toAddress,
      value: amount,
    }

    try {
      const txid = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [params],
      })

      addModal({
        type: ModalType.TransactionSubmitted,
        props: { txid },
      })
    } catch (error: any) {
      switch (error.code) {
        case 4001:
          addModal({ type: ModalType.TransactionCanceled })
          break
        default:
          addModal({ type: ModalType.Error })
          break
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="toAddress"
        placeholder="Address"
        defaultValue="0x903252da44366cDF3b510144D8f3B863e9Fb4870"
      />
      <input
        type="text"
        pattern="[-+]?[0-9]*[.,]?[0-9]+"
        name="amount"
        placeholder="Amount"
      />
      <button type="submit">Send</button>
    </form>
  )
}
