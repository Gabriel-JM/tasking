import { HttpRequest, Repository } from '../../protocols/infra'
import { User } from '../../protocols/models'
import { Hasher, IEmailValidator } from '../../protocols/utils'
import { TokenGenerator } from '../../protocols/utils/token-generator'
import { ErrorParser } from '../../resources/errors/error-parser'
import { HttpResponse } from '../../resources/http/http-response'

export class LoginController {

  constructor(
    private readonly repository: Repository<User>,
    private readonly passwordHasher: Hasher,
    private readonly tokenGenerator: TokenGenerator,
    private readonly emailValidator: IEmailValidator
  ) {}

  async create(request: HttpRequest) {
    try {
      const { name, email, username, password } = request.body as User

      if(!this.emailValidator.isValid(email)) {
        return HttpResponse.badRequest({
          field: 'email',
          error: 'Invalid e-mail'
        })
      }

      const hashedPassword = await this.passwordHasher.hash(password)

      const userCredentials = {
        username,
        name,
        email,
        password: hashedPassword
      }

      const user = await this.repository.save!(userCredentials)

      const token = this.tokenGenerator.generate(user)

      return HttpResponse.ok({
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        token
      })
    } catch(catchedError) {
      return ErrorParser.catch(catchedError)
    }
  }
}
