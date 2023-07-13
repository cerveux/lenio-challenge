import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './screens/Home'
import NavBar from './components/NavBar'
import Heroes from './screens/Heroes'
import { useApi } from './hooks/useApi'

function App() {
  const [count, setCount] = useState(0)

  const {getHeros} = useApi();


  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path='/' element = {<Home/>} />
      <Route path='/hero' element = {<Heroes />} />
    </Routes>

    </BrowserRouter>
      )
}

export default App
