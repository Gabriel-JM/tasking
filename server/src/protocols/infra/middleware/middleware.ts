import { MiddlewareResponseFunction } from './middleware-response-function'

export interface Middleware {
  [key: string]: MiddlewareResponseFunction
}
