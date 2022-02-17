import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'
import './App.css'

import { useNetwork } from './hooks'

import { CurrentNetwork } from './components/CurrentNetwork'
import { Effects } from './components/Effects'
import { Form } from './components/Form'
import { UserMenu } from './components/UserMenu'
import { Wallets } from './components/Wallets'

function Main() {
  const navigate = useNavigate()
  const { address, updateAddress } = useNetwork()

  const { ethereum } = window

  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum, 'any')
    const accounts = await provider.send('eth_requestAccounts', [])
    if (accounts && accounts[0]) {
      updateAddress(accounts[0])
    }
  }

  useEffect(() => {
    if (!ethereum) return navigate('/guide')
  }, [ethereum, navigate])

  return (
    <div className="app">
      <div className="content">
        {address ? (
          <>
            <UserMenu address={address} />
            <CurrentNetwork />
            <dl className="address">
              <dt>Address</dt>
              <dd>{address || '-'}</dd>
            </dl>
            <Wallets address={address} />
            <hr />
            <Form address={address} />
          </>
        ) : (
          <>
            <h1>Welcome!</h1>
            <button onClick={connect} disabled={!!address} type="button">
              Connect a Wallet 🦊
            </button>
          </>
        )}
      </div>

      {ethereum && address && (
        <Effects address={address} updateAddress={updateAddress} />
      )}
    </div>
  )
}

export default Main
