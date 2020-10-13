import React from 'react'
import InputField from './components/Forms/InputField'
import Title from './components/Title'

function App() {
  return (
    <>
      <Title />
      <InputField label="Texto" type="text" />
      <InputField label="Texto" type="text" required errors />
    </>
  )
}

export default App
