import { ILoginRepository } from '../../protocols/domain'
import { ISessionUseCase, UseCaseResponses } from '../../protocols/usecases'
import { TokenGenerator } from '../../protocols/utils'
import { AuthorizationHeaderParser } from '../../protocols/utils/authorization-header-parser'

export class SessionUseCase implements ISessionUseCase {
  constructor(
    private readonly loginRepository: ILoginRepository,
    private readonly tokenGenerator: TokenGenerator,
    private readonly headerParser: AuthorizationHeaderParser
  ) {}

  async extractUser(authToken: string): Promise<UseCaseResponses> {
    try {
      const token = this.headerParser.bearer(authToken)

      const { id: userIdFromToken } = this.tokenGenerator.verify(token)

      const user = await this.loginRepository.find(userIdFromToken)

      return {
        ok: true,
        data: user
      }
    } catch(catchedError) {
      return {
        ok: false,
        error: catchedError.message
      }
    }
  }
}
