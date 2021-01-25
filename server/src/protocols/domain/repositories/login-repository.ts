import { Repository } from '../../infra'
import { User } from '../../models'

export interface ILoginRepository extends Repository<User> {
  find(id: number): Promise<User | null>
  findByUsernameAndPassword(content: { username: string, password: string }): Promise<User | null>
}
