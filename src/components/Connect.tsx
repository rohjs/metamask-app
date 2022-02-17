import { ethers } from 'ethers'

import { useModal, useNetwork } from '../hooks'
import { ModalType } from '../types/modal.d'

export const Connect = () => {
  const { ethereum } = window
  const { addModal } = useModal()
  const { updateAddress } = useNetwork()

  if (!ethereum) return null

  const provider = new ethers.providers.Web3Provider(ethereum)

  const connect = async () => {
    try {
      const accounts = await provider.send('eth_requestAccounts', [])
      if (accounts && accounts[0]) {
        updateAddress(accounts[0])
      }
    } catch (err) {
      addModal({
        type: ModalType.Error,
      })
    }
  }

  return (
    <button onClick={connect} type="button">
      Connect a Wallet 🦊
    </button>
  )
}
