import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Title from './components/Title'
import AppRouter from './router'
import { AuthProvider } from './providers/auth'

import './assets/css/buttons.css'

function App() {
  return (
    <AuthProvider>
      <Title />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
