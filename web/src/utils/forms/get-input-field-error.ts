import { FieldError } from 'react-hook-form'

export default function getErrorObj(error: FieldError | undefined) {
  return error
  ? {
      type: error.type,
      message: error.message || 'Input Error'
    }
  : undefined
}
