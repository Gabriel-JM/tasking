import { NextFunction, Request, Response } from 'express'

export function cors(req: Request, res: Response, next: NextFunction) {
  res.set('Access-Control-Allow-Origin', process.env.WEB_URL)
  res.set('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE')
  res.set('Access-Control-Allow-Headers', '*')
  res.set('Access-Control-Max-Age', '86400')
  next()
}
