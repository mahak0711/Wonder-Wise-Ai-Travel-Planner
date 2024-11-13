import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import Hero from './components/custom/Hero'
import CreateTrip from './create-trip/index.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/create-trip" element={<CreateTrip />} /> {/* Add CreateTrip route */}
      </Routes>
    </Router>
  )
}

export default App
