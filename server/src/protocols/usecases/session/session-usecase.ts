import { UseCaseResponses } from '../usecase-responses'

export interface ISessionUseCase {
  extractUser(authToken: string): Promise<UseCaseResponses>
}
