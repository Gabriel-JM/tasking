import { Repository } from '../../infra'
import { User } from '../../models'

export interface ILoginRepository extends Repository<User> {
  findByUsernameAndPassword(content: { username: string, password: string }): Promise<User>
}
