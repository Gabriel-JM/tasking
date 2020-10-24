import React, { FormEvent, forwardRef, ForwardRefRenderFunction, InputHTMLAttributes, useEffect, useState } from 'react'
import InputErrorWarn from '../InputErrorWarn'
import './input-field.css'

interface InputError {
  type: string
  message: string
}

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  errors?: InputError
}

const InputField: ForwardRefRenderFunction<HTMLInputElement, InputFieldProps> = (
  { label, required, errors, ...inputProps },
  ref
) => {
  const [fieldError, setFieldError] = useState<InputError>()
  
  useEffect(() => {
    setFieldError(errors)
  }, [errors])
  
  function onInputError(event: React.FormEvent) {
    const input = event.target as HTMLInputElement
    
    if(input.value && input.className === 'error' && fieldError?.type === 'required') {
      input.className = ''
      setFieldError(undefined)
      return
    }
    
    if(!input.value && required) {
      input.className = 'error'
      setFieldError({
        type: 'required',
        message: 'Required Field'
      })
    }
  }

  function handleOnInput(event: FormEvent<HTMLInputElement>) {
    if(inputProps.onInput) inputProps.onInput(event)

    onInputError(event)
  }

  return (
    <label className="input-container">
      <span
        className={required ? 'required' : ''}
      >{label}</span>
      <div className="input-field">
        <input
          className={fieldError ? 'error' : ''}
          ref={ref}
          {...inputProps}
          onInput={handleOnInput}
        />
        {fieldError?.type && <InputErrorWarn message={fieldError.message} />}
      </div>
    </label>
  )
}

export default forwardRef(InputField)
