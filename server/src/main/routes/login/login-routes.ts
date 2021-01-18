import { Router } from 'express'
import { ExpressRouterAdapter } from '../../adapters/express-router-adapter'
import compose from '../../composers/login-controller-composer'

const loginRoutes = Router()
const loginController = compose()
const adapt = ExpressRouterAdapter(loginController)

loginRoutes.get('/', adapt(loginController.index))

export { loginRoutes }
