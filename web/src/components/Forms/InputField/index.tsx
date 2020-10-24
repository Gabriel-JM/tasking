import React, { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes, useEffect, useState } from 'react'
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
  
  useEffect(() => { setFieldError(errors) }, [errors])
  
  function onInputError(event: React.FormEvent) {
    const input = event.target as HTMLInputElement
    
    if(input.className === 'error' && fieldError?.type === 'required') {
      input.className = ''
      setFieldError(undefined)
      return
    }
    
    if(!input.value && required) {
      input.className = 'error'
      setFieldError({
        type: 'required',
        message: 'This field is required'
      })
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
          ref={ref}
          {...inputProps}
          onInput={onInputError}
        />
        {fieldError?.type && <InputErrorWarn message={fieldError.message} />}
      </div>
    </label>
  )
}

export default forwardRef(InputField)
