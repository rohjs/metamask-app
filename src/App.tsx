import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Main from './Main'
import Guide from './Guide'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/guide" element={<Guide />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
