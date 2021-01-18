import { ILoginRepository } from '../../protocols/domain'
import { HttpRequest } from '../../protocols/infra'
import { User } from '../../protocols/models'
import { Hasher, IEmailValidator } from '../../protocols/utils'
import { TokenGenerator } from '../../protocols/utils/token-generator'
import { ErrorParser } from '../../resources/errors/error-parser'
import { HttpResponse } from '../../resources/http/http-response'

export class LoginController {

  constructor(
    private readonly repository: ILoginRepository,
    private readonly passwordHasher: Hasher,
    private readonly tokenGenerator: TokenGenerator,
    private readonly emailValidator: IEmailValidator
  ) {}

  async index(request: HttpRequest) {
    try {
      const { authorization } = request.headers
      
      if(!authorization) {
        return HttpResponse.notAcceptable({
          field: 'authorization',
          error: 'Authorization field cannot be empty'
        })
      }
      
      const [username, password] = Buffer
        .from(
          authorization.replace(/Basic /, ''),
          'base64'
        )
        .toString()
        .split(':')
      ;

      const user = await this.repository
        .findByUsernameAndPassword({ username, password })
      ;

      if(!user) {
        return HttpResponse.notFound({
          field: '',
          error: 'Invalid username or password'
        })
      }

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
