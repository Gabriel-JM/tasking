import { AuthorizationHeaderParser } from '../../../protocols/utils/authorization-header-parser'
import { BasicAuthorizationError } from '../../errors/basic-authorization-error'
import { BearerAuthorizationError } from '../../errors/bearer-authorization-error'

export class AuthHeaderParser implements AuthorizationHeaderParser {

  basic(authText: string): [string, string] {
    if(!(/^Basic /).test(authText)) {
      throw new BasicAuthorizationError()
    }

    const text = authText.replace(/Basic /, '')

    const [username, password] = Buffer
      .from(text,'base64')
      .toString()
      .split(':')
    ;

    return [username, password]
  }

  bearer(authText: string) {
    if(!(/^Bearer /).test(authText)) {
      throw new BearerAuthorizationError()
    }

    const token = authText.replace(/Bearer /, '')

    return token
  }
}
