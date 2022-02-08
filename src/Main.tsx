import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import store from 'store'
import './App.css'

import { Effects } from './Effects'
import { Form } from './Form'

function Main() {
  const [address, setAddress] = useState(store.get(`meta.account`) || '')
  const navigate = useNavigate()

  const updateAddress = (newAcccount: string) => {
    if (!newAcccount) return
    setAddress(newAcccount)
    store.set(`meta.account`, newAcccount)
  }

  const connect = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    if (accounts && accounts[0]) updateAddress(accounts[0])
  }

  useEffect(() => {
    if (!window.ethereum) return navigate('/guide')
  }, [navigate])

  return (
    <div className="Main">
      Main
      <dl>
        <dt>Address</dt>
        <dd>{address || '-'}</dd>
      </dl>
      <button onClick={connect} disabled={!!address} type="button">
        Connect
      </button>
      {address && <Form address={address} />}
      {window.ethereum && <Effects updateAddress={updateAddress} />}
    </div>
  )
}

export default Main
