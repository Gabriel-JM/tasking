import { HttpRequest, Repository } from '../../protocols/infra'
import { Category } from '../../protocols/models'
import { ErrorParser } from '../../resources/errors/error-parser'
import { HttpResponse } from '../../resources/http/http-response'

export class CategoriesController {
  constructor(
    private readonly repository: Repository<Category>
  ) {}

  async index() {
    try {
      const allCategories = await this.repository.findAll!()

      return HttpResponse.ok(allCategories)
    } catch(catchedError) {
      return ErrorParser.catch(catchedError)
    }
  }
}
