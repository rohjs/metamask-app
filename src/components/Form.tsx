import {
  ChangeEvent,
  FC,
  FocusEvent,
  FormEvent,
  useEffect,
  useState,
} from 'react'
import { ethers, FixedNumber } from 'ethers'
import { isAddress } from 'ethers/lib/utils'
import store from 'store'
import cx from 'classnames'

import { useModal, useNetwork } from '../hooks'
import { ModalType } from '../types/modal.d'
import {
  ETHERS_ABI,
  HOTBODY_TOKEN_ADDRESS,
  HOTBODY_TOKEN_DECIMALS,
} from '../constants'

type FormProps = {
  address: string
}

type TransferFunctionParams = {
  receiver: string
  amount: string
}

type FormError = {
  address: boolean
  amount: boolean
}

const INITIAL_ERROR: FormError = {
  address: false,
  amount: false,
}

export const Form: FC<FormProps> = ({ address }) => {
  const [error, setError] = useState<FormError>(INITIAL_ERROR)

  const { ethereum } = window
  const { addModal } = useModal()
  const { isGoerli } = useNetwork()

  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const hbdContract = new ethers.Contract(
    HOTBODY_TOKEN_ADDRESS,
    ETHERS_ABI,
    signer
  )

  const handleHbdTransferEvent = () => {
    window.location.reload()
  }

  const handleEthTransferEvent = () => {
    store.remove(`meta.eth.txid`)
    window.location.reload()
  }

  const handleErrors = (error: any) => {
    console.log(error)
    switch (error.code) {
      case 4001:
        addModal({ type: ModalType.TransactionCanceled })
        break
      default:
        addModal({ type: ModalType.Error })
        break
    }
  }

  const transferEth = async ({ receiver, amount }: TransferFunctionParams) => {
    try {
      const { hash } = await signer.sendTransaction({
        to: receiver,
        from: address,
        value: amount,
      })
      store.set(`meta.eth.txid`, hash)
      provider.once(hash, handleEthTransferEvent)
      addModal({
        type: ModalType.TransactionSubmitted,
        props: { txid: hash },
      })
    } catch (error) {
      handleErrors(error)
    }
  }

  const transferHotbody = async ({
    receiver,
    amount,
  }: TransferFunctionParams) => {
    let weiAmount = ethers.utils.formatUnits(amount, 'wei')
    weiAmount = ethers.utils
      .formatUnits(weiAmount, 18 - HOTBODY_TOKEN_DECIMALS)
      .split('.')[0]

    try {
      const { hash } = await hbdContract.transfer(receiver, weiAmount)

      addModal({
        type: ModalType.TransactionSubmitted,
        props: { txid: hash },
      })
    } catch (err) {
      handleErrors(err)
    }
  }

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

    const amount = FixedNumber.fromString(rawAmount).toHexString()
    const params = { receiver, amount }

    if (tokenType === 'ETH') transferEth(params)
    else transferHotbody(params)
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

  useEffect(() => {
    const ongoingEthTx = store.get(`meta.eth.txid`)
    if (!!ongoingEthTx) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      provider.once(ongoingEthTx, handleEthTransferEvent)
    }
  }, [ethereum])

  useEffect(() => {
    const hbdContract = new ethers.Contract(
      HOTBODY_TOKEN_ADDRESS,
      ETHERS_ABI,
      signer
    )
    hbdContract.on('Transfer', handleHbdTransferEvent)
    return () => {
      hbdContract.off('Transfer', handleHbdTransferEvent)
    }
  }, [])

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
