import React from 'react'
import AlertIcon from '../../Icons/alert-icon'
import './input-error-warn.css'

interface InputErrorWarnProps {
  message: string
}

function InputErrorWarn({ message }: InputErrorWarnProps) {
  return (
    <div
      className="input-error-warn-container"
      data-message={message}
    >
      <AlertIcon className="error-icon" />
    </div>
  )
}

export default InputErrorWarn
