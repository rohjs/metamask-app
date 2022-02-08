import { FormEvent } from 'react'
import { FixedNumber } from 'ethers'
import './App.css'

type FormProps = {
  address: string
}

export const Form = ({ address }: FormProps) => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const amount = FixedNumber.fromString(
      e.currentTarget.amount.value
    ).toHexString()
    const toAddress = e.currentTarget.toAddress.value

    const params = {
      from: address,
      to: toAddress,
      value: amount,
    }

    const data = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [params],
    })
    console.log(data)
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
