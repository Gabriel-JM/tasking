import express from 'express'
import setup from '../config/setup'

const app = express()

setup(app)

export { app }
