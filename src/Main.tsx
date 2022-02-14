import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'
import store from 'store'
import './App.css'

import { CurrentNetwork } from './components/CurrentNetwork'
import { Effects } from './components/Effects'
import { Form } from './components/Form'
import { UserMenu } from './components/UserMenu'
import { Wallets } from './components/Wallets'

function Main() {
  const [address, setAddress] = useState(store.get(`meta.account`) || '')
  const navigate = useNavigate()

  const updateAddress = (newAcccount: string) => {
    if (!newAcccount) return
    setAddress(newAcccount)
    store.set(`meta.account`, newAcccount)
  }

  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    const accounts = await provider.send('eth_requestAccounts', [])
    if (accounts && accounts[0]) {
      updateAddress(accounts[0])
    }
  }

  useEffect(() => {
    if (!window.ethereum) return navigate('/guide')
  }, [navigate])

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
      {window.ethereum && address && <Effects updateAddress={updateAddress} />}
    </div>
  )
}

export default Main
