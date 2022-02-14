import { useNetwork } from '../hooks'

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
  const { chainId } = useNetwork()

  if (!chainId) return null

  const networkName = getNetworkName(chainId)
  const networkColor = NETWORKS[networkName]

  return (
    <div className="network">
      <div>
        <span style={{ backgroundColor: networkColor }} />
        <h2>{networkName}</h2>
      </div>

      {chainId !== 5 && <p>HOTBODY is only supported in Goerli network 🔥</p>}
    </div>
  )
}
