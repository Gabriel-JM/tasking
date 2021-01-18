import { Application } from 'express'
import { loginRoutes } from '../routes/login/login-routes'
import { signupRoutes } from '../routes/signup/signup-routes'

export default (app: Application) => {
  app.use('/signup', signupRoutes)
  app.use('/login', loginRoutes)
}
