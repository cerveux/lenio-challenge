import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './screens/Home'
import NavBar from './components/NavBar'
import Heroes from './screens/Heroes'
import { useApi } from './hooks/useApi'
import './styles/App.css'

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
