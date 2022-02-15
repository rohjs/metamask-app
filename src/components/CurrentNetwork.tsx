import { useNetwork } from '../hooks'
import { addModal } from '../store/modal'
import { ModalType } from '../types/modal.d'

const NETWORKS = {
  ethereum: '#60B4AD',
  ropsten: '#E2578D',
  kovan: '#8966F6',
  rinkeby: '#EEC55C',
  goerli: '#5398EC',
  unknown: '#273444',
}

const getNetworkName = (chainId: number) => {
  switch (chainId) {
    case 1:
      return 'ethereum'
    case 3:
      return 'ropsten'
    case 42:
      return 'kovan'
    case 4:
      return 'rinkeby'
    case 5:
      return 'goerli'
    default:
      return 'unknown'
  }
}

export const CurrentNetwork = () => {
  const { chainId, isGoerli } = useNetwork()

  if (!chainId) return null

  const { ethereum } = window

  const networkName = getNetworkName(chainId)
  const networkColor = NETWORKS[networkName]

  const switchToGoerli = async () => {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x5' }],
      })
    } catch (err: any) {
      console.log(err)
      addModal({
        type: ModalType.Error,
      })
    }
  }

  return (
    <div className="network">
      <div>
        <span style={{ backgroundColor: networkColor }} />
        <h2>{networkName}</h2>
      </div>

      {!isGoerli && (
        <p>
          HOTBODY is only supported in{' '}
          <button onClick={switchToGoerli} type="button">
            Goerli network
          </button>{' '}
          🔥
        </p>
      )}
    </div>
  )
}
