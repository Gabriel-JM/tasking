import { NextFunction, Request, Response } from 'express'
import { MiddlewareHttpRequest } from '../../protocols/infra'
import { Middleware } from '../../protocols/infra/middleware/middleware'
import { MiddlewareResponseFunction } from '../../protocols/infra/middleware/middleware-response-function'
import { StringKeyAccess } from '../../protocols/utils'

export function ExpressMiddlewareAdapter(controller: Middleware) {
  function adapt(routerFunc: MiddlewareResponseFunction) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const httpRequest: MiddlewareHttpRequest = {
        url: req.url,
        headers: req.headers,
        params: req.params,
        query: req.query as StringKeyAccess,
        body: req.body
      }

      const adaptedFunc = routerFunc.bind(controller)
      const { success, response } = await adaptedFunc(httpRequest)

      if(!success && response) {
        return res.status(response.status).json(response.body)
      }

      next()
    }
  }

  return adapt
}
