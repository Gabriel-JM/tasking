import express, { Application } from 'express'
import cors from 'cors'

export default (app: Application) => {
  app.use(express.json())
  app.use(cors({
    maxAge: 86400,
    origin: process.env.WEB_URL
  }))
}
