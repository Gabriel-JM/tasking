import { ICategoriesRepository } from '../../protocols/domain/repositories/categories-repository'
import { HttpRequest } from '../../protocols/infra'
import { Category } from '../../protocols/models'
import { ISessionUseCase } from '../../protocols/usecases'
import { ErrorParser } from '../../resources/errors/error-parser'
import { HttpResponse } from '../../resources/http/http-response'

export class CategoriesController {
  constructor(
    private readonly repository: ICategoriesRepository,
    private readonly sessionUsecase: ISessionUseCase
  ) {}

  async index(request: HttpRequest) {
    try {
      const { authorization } = request.headers

      if(!authorization) {
        return HttpResponse.badRequest({
          field: 'authorization',
          error: 'Empty authorization field'
        })
      }

      const extractResult = await this.sessionUsecase.extractUser(authorization)

      if(!extractResult.ok) {
        return HttpResponse.badRequest({
          field: 'authorization',
          error: extractResult.error
        })
      }

      const allCategories = await this.repository.findAllByUserId(
        extractResult.data.id
      )

      return HttpResponse.ok(allCategories)
    } catch(catchedError) {
      return ErrorParser.catch(catchedError)
    }
  }

  async create(request: HttpRequest) {
    try {
      const { color, name, user } = request.body as Category

      const category = await this.repository.save({
        name,
        color,
        user
      })

      return HttpResponse.ok(category)
    } catch(catchedError) {
      return ErrorParser.catch(catchedError)
    }
  }
}
