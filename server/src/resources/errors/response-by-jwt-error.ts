import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { HttpResponse } from '../http/http-response'

export function isJWTError(err: Error) {
  if(err instanceof JsonWebTokenError) {
    return HttpResponse.notAcceptable({
      field: 'token',
      error: err.message
    })
  }

  if(err instanceof TokenExpiredError) {
    return HttpResponse.badRequest({
      field: 'token',
      error: err.message
    })
  }

  return null
}
