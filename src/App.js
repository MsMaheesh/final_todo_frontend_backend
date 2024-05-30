
import React, { useState , createContext} from 'react'
import './css/app.css'
import Register from './Register'
import Login from './Login'


import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './Home'
import Main from './Main'

export const store= createContext();
function App() {
  const [token,setToken]=useState(null)

  return (
    <div>
    <store.Provider value={[token, setToken]}>
    <BrowserRouter>
  
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/Register' element={<Register />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Main' element={<Main/>}/>
      </Routes>
      </BrowserRouter>
      </store.Provider>
      
  </div>
  )
}

export default App