import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

import { useNetwork } from './hooks'

import { Connect } from './components/Connect'
import { CurrentNetwork } from './components/CurrentNetwork'
import { Effects } from './components/Effects'
import { Form } from './components/Form'
import { UserMenu } from './components/UserMenu'
import { Wallets } from './components/Wallets'

function Main() {
  const navigate = useNavigate()
  const { address } = useNetwork()

  const { ethereum } = window

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
            <Connect />
          </>
        )}
      </div>

      {ethereum && address && <Effects />}
    </div>
  )
}

export default Main
