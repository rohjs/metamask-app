import {
  HOTBODY_TOKEN_ADDRESS,
  HOTBODY_TOKEN_DECIMALS,
  HOTBODY_TOKEN_SYMBOL,
} from '../constants'
import { useModal } from '../hooks'
import { ModalType } from '../types/modal.d'

export const ImportToken = () => {
  const { ethereum } = window
  const { addModal } = useModal()

  const importToken = async () => {
    try {
      await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: HOTBODY_TOKEN_ADDRESS,
            symbol: HOTBODY_TOKEN_SYMBOL,
            decimals: HOTBODY_TOKEN_DECIMALS,
          },
        },
      })
    } catch (error) {
      addModal({ type: ModalType.Error })
    }
  }

  return (
    <div className="walletGuide">
      <h3>
        Can't find $HOTBODY
        <br />
        in your wallet? 🥲
      </h3>
      <button className="outlined-button" onClick={importToken} type="button">
        Import $HOTBODY 🚀
      </button>
    </div>
  )
}
