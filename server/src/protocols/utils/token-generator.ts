import { User } from '../models'

export interface TokenGenerator {
  generate(user: User): string
}
