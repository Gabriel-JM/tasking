import React from 'react'
import AlertIcon from '../../Icons/alert-icon'
import './input-field.css'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  errors?: boolean
}

function InputField({ label, required, errors, ...inputProps }: InputFieldProps) {

  function onInputError(event: React.FormEvent) {
    const input = event.target as HTMLInputElement
    input.className === 'error' && (input.className = '')
    !input.value && required && (input.className = 'error')
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
        {errors && <AlertIcon className="error-icon" />}
      </div>
    </label>
  )
}

export default InputField
