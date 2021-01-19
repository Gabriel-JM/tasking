import { HttpRequest } from './http-request'

export const api = HttpRequest(process.env.SERVER_URL)
