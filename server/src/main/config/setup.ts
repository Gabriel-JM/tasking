import express, { Application } from 'express'
import cors from 'cors'
import userVerificationMiddlewareComposer from '../composers/user-verification-middleware-composer'
import { ExpressMiddlewareAdapter } from '../adapters/express-middleware-adapter'

const userVerification = userVerificationMiddlewareComposer()
const adapt = ExpressMiddlewareAdapter(userVerification)

export default (app: Application) => {
  app.use(express.json())
  app.use(cors({
    maxAge: 86400,
    origin: process.env.WEB_URL
  }))
  app.use(adapt(userVerification.verify))
}
