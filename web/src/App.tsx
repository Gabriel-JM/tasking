import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Title from './components/Title'
import AppRouter from './router'

import './assets/css/buttons.css'

function App() {
  return (
    <>
      <Title />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  )
}

export default App
