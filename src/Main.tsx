import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

function Main() {
  const [address, setAddress] = useState('')
  const navigate = useNavigate()

  const connect = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })

    if (accounts) setAddress(accounts[0])
  }

  useEffect(() => {
    if (!window.ethereum) {
      return navigate('/guide')
    }
  }, [navigate])

  return (
    <div className="Main">
      Main
      <dl>
        <dt>Address</dt>
        <dd>{address || '-'}</dd>
      </dl>
      <button onClick={connect} type="button">
        Connect
      </button>
    </div>
  )
}

export default Main
