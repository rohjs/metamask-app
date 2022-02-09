import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { getModals } from './store/modal'
import { useAppSelector } from './hooks'

import { Modal } from './components/Modal'
import Main from './Main'
import Guide from './Guide'

function App() {
  const modals = useAppSelector(getModals)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/guide" element={<Guide />} />
        </Routes>
      </BrowserRouter>

      {modals && <Modal />}
    </>
  )
}

export default App
