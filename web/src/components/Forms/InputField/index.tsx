import React from 'react'
import InputErrorWarn from '../InputErrorWarn'
import './input-field.css'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  errors?: {
    type?: string
    message?: string
  }
}

function InputField({ label, required, errors, ...inputProps }: InputFieldProps) {

  function onInputError(event: React.FormEvent) {
    const input = event.target as HTMLInputElement
    
    if(input.className === 'error' && errors?.type === 'required') {
      input.className = ''
      return
    }
    
    if(!input.value && required) {
      input.className = 'error'
    }
  }

  return (
    <label className="input-container">
      <span
        className={required ? 'required' : ''}
      >{label}</span>
      <div className="input-field">
        <input
          className={errors ? 'error' : ''}
          {...inputProps}
          onInput={onInputError}
        />
        {errors?.type && <InputErrorWarn message={errors.message || ''} />}
      </div>
    </label>
  )
}

export default InputField
