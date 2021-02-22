import { MiddlewareHttpRequest } from '../http/middleware-http-request'
import { MiddlewareResponse } from './middleware-response'

export type MiddlewareResponseFunction = (request: MiddlewareHttpRequest) => MiddlewareResponse | Promise<MiddlewareResponse>
