import { MiddlewareHttpRequest } from '../../../protocols/infra'
import { TokenGenerator } from '../../../protocols/utils'
import { AuthorizationHeaderParser } from '../../../protocols/utils/authorization-header-parser'
import { ErrorParser } from '../../errors/error-parser'
import { HttpResponse } from '../../http/http-response'

const acceptablePaths = ['/login', '/login/verify', '/signup']

export class UserVerification {
  constructor(
    private readonly tokenGenerator: TokenGenerator,
    private readonly headerParser: AuthorizationHeaderParser
  ) {}

  verify(request: MiddlewareHttpRequest) {
    if(acceptablePaths.includes(request.url)) {
      return { success: true }
    }

    try {
      const { authorization } = request.headers

      if(!authorization) {
        return {
          success: false,
          response: HttpResponse.notAcceptable({
            field: 'authorization',
            error: 'Authorization field cannot be empty'
          })
        }
      }

      const userToken = this.headerParser.bearer(authorization)
      this.tokenGenerator.verify(userToken)

      return { success: true }
    } catch(catchedError) {
      return {
        success: false,
        response: ErrorParser.catch(catchedError)
      }
    }
  }
}
