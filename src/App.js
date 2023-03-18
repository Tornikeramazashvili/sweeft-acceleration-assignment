import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Users } from './pages/users/Users'
import { SingleUser } from './pages/singleUser/SingleUser'
import { Friends } from './pages/friends/Friends'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/user/:id" element={<SingleUser />} />
        <Route path="/user/:id" element={<Friends />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App