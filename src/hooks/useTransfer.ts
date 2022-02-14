import { ethers } from 'ethers'

import {
  ETHERS_ABI,
  HOTBODY_TOKEN_ADDRESS,
  HOTBODY_TOKEN_DECIMALS,
} from '../constants'
import { ModalType } from '../types/modal.d'
import { useModal } from '.'

type TransferFunctionParams = {
  receiver: string
  amount: string
}

export const useTransfer = (address: string) => {
  const { addModal } = useModal()

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const hbdContract = new ethers.Contract(
    HOTBODY_TOKEN_ADDRESS,
    ETHERS_ABI,
    signer
  )

  const handleError = (error: any) => {
    let code = error.code
    if (typeof code !== 'number' && error.error) {
      code = error.error.code
    }

    switch (code) {
      case 4001:
        addModal({ type: ModalType.TransactionCanceled })
        break
      case -32000:
      case -32603:
        addModal({
          type: ModalType.Error,
          props: {
            message: '🥺 Insufficient funds',
          },
        })
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
      addModal({
        type: ModalType.TransactionSubmitted,
        props: { txid: hash },
      })
    } catch (err: any) {
      handleError(err)
    }
  }

  const transferHbd = async ({ receiver, amount }: TransferFunctionParams) => {
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
      handleError(err)
    }
  }

  return {
    transferEth,
    transferHbd,
  }
}
