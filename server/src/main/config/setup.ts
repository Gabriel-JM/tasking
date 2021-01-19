import express, { Application } from 'express'
import dotenv from 'dotenv-safe'
import { cors } from './cors'

export default (app: Application) => {
  dotenv.config()

  app.use(express.json())
  app.use(cors)
}
