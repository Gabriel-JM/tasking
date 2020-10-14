import React from 'react'
import InputField from './components/Forms/InputField'
import Title from './components/Title'

import './assets/css/buttons.css'

function App() {
  return (
    <div style={{ margin: '6px' }}>
      <Title />
      <InputField label="Texto" type="text" />
      {/* <InputField label="Texto" type="text" required errors={{
        type: 'required',
        message: 'Required fields'
      }}/>
      <InputField label="Texto" type="text" errors={{
        type: 'field',
        message: 'Required fields, of many orther inputs, of thounsand of orther things about'
      }} /> */}
      <button className="btn">Botão</button>
      <br/>
      <br/>
      <button className="btn" disabled>Botão</button>
      <br/>
      <br/>
      <button className="btn primary">Botão</button>
      <br/>
      <br/>
      <button className="btn primary" disabled>Botão</button>
    </div>
  )
}

export default App
