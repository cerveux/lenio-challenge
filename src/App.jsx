import { useState, createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './screens/Home'
import NavBar from './components/NavBar'
import Heroes from './screens/Heroes'
import { useApi } from './hooks/useApi'
import './styles/App.css'

import { AppContextProvider } from './context/AppContextProvider'

function App() {


  return (
    <AppContextProvider>

      <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path='/' element = {
   
        <Home/>
    } />
      <Route path='/hero' element = {<Heroes />} />
    </Routes>

    </BrowserRouter>
    </AppContextProvider>
   


    
    
    
    
      )
}

export default App
