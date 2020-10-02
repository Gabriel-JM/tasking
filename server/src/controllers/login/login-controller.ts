import { HttpRequest, Repository } from '../../protocols/infra'
import { User } from '../../protocols/models'
import { Hasher } from '../../protocols/utils'
import { TokenGenerator } from '../../protocols/utils/token-generator'
import { HttpResponse } from '../../resources/http/http-response'

export class LoginController {

  constructor(
    private readonly repository: Repository<User>,
    private readonly passwordHasher: Hasher,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async create(request: HttpRequest) {
    try {
      const { username, password } = request.body as User
      const hashedPassword = this.passwordHasher.hash(password)

      const userCredentials = {
        username,
        password: hashedPassword
      }

      const user = await this.repository.save!(userCredentials)

      const token = await this.tokenGenerator.generate(user)

      return HttpResponse.ok({
        id: user.id,
        username: user.username,
        token
      })
    } catch(catchedError) {
      return HttpResponse.serverError(catchedError)
    }
  }
}
