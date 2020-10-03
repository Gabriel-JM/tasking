import { User } from '../models'

export interface TokenGenerator {
  generate(user: User): string
  verify(tokenToVerify: string): string
}
