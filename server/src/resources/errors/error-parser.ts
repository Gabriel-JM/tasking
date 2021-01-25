import { HttpResponseData } from '../../protocols/infra'
import { SqliteError } from '../../protocols/utils'
import { HttpResponse } from '../http/http-response'
import { responseBySqliteError } from './response-by-sqlite-error'
import { isJWTError } from './response-by-jwt-error'

export class ErrorParser {
  static catch(err: Error | SqliteError): HttpResponseData {
    let customError: HttpResponseData | null = null

    process.env.SHOW_LOGS && console.dir(err)

    if('code' in err) {
      const { code, message } = err as SqliteError
      return responseBySqliteError[code](message)
    }

    customError = isJWTError(err)

    const defaultError = HttpResponse.serverError({
      field: '',
      error: err.message
    })

    return customError || defaultError
  }
}
