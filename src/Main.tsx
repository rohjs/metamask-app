import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

function Main() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!window.ethereum) {
      return navigate('/guide')
    }
  }, [navigate])

  return <div className="Main">Main</div>
}

export default Main
