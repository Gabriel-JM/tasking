import { Repository } from '../../infra'
import { User } from '../../models'

export interface ILoginRepository extends Repository<User> {
  find(id: number): Promise<User | null>
  findByUsername(username: string): Promise<User | null>
}
