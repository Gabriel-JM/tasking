import { HttpResponseData } from '../http/http-response-data'

export interface MiddlewareResponse {
  success: boolean
  response?: HttpResponseData
}
