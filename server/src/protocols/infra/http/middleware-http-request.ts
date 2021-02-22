import { HttpRequest } from './http-request'

export interface MiddlewareHttpRequest extends HttpRequest {
  url: string
}
