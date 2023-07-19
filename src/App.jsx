import { useState, createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './screens/Home'
import SearchBar from './components/SearchBar'
import Heroes from './screens/Heroes'

import { useApi } from './hooks/useApi'
import './styles/App.css'

import { AppContextProvider } from './context/AppContextProvider'
import SearchResults from './screens/SearchResults'

function App() {


  return (
    <AppContextProvider>

      <BrowserRouter>
        <SearchBar />
        <Routes>
          <Route path='/' element={

            <Home />
          } />
          <Route path='/search' element={<SearchResults />} />
        </Routes>

      </BrowserRouter>
    </AppContextProvider>







  )
}

export default App
