import { inMemoryDb } from '../test/inMemoryDB'
import { LoginRepository } from './login-repository'

const testDb = inMemoryDb()

function makeSut() {
  const sut = new LoginRepository('users', testDb)

  return sut
}

describe('Login Repository', () => {
  beforeAll(async () => {
    return await testDb.migrate.latest()
  })

  afterAll(async () => {
    await testDb.migrate.rollback()
    return await testDb.destroy()
  })

  it('should insert a new user', async () => {
    const sut = makeSut()
    const user = {
      username: 'any_user',
      password: 'hashed_password'
    }

    const insertedUser = await sut.save(user)
    const [fromDbUser] = await testDb('users').where({ id: insertedUser.id })

    expect(insertedUser).toBeDefined()
    expect(insertedUser).toEqual(fromDbUser)
  })
})
