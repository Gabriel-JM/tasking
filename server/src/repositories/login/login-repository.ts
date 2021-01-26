import Knex from 'knex'
import { ILoginRepository } from '../../protocols/domain'
import { User } from '../../protocols/models'

export class LoginRepository implements ILoginRepository {
  constructor(
    private readonly table: string,
    private readonly knex: Knex<User>
  ) {}

  async find(id: number) {
    const [user] = await this.knex(this.table).where({ id })

    return user || null
  }

  async findByUsername(username: string) {
    const [user] = await this.knex(this.table).where({
      username
    })

    return user || null
  }

  async save(user: User) {
    const [newUserId] = await this.knex(this.table).insert(user)

    const [newUser] = await this.knex(this.table).where({ id: newUserId })

    return newUser
  }
}
