import { HttpRequest } from './http-request'

export const api = HttpRequest(process.env.REACT_APP_SERVER_URL)
