import { inMemoryDb } from '../test/inMemoryDB'
import { LoginRepository } from './login-repository'

const testDb = inMemoryDb()

function makeSut() {
  const sut = new LoginRepository('users', testDb)

  return sut
}

describe('Login Repository', () => {
  let insertedId: number
  const user = {
    name: 'any name',
    username: 'any_user',
    email: 'any@email.com',
    password: 'hashed_password'
  }

  beforeAll(async () => {
    return await testDb.migrate.latest()
  })

  afterAll(async () => {
    await testDb.migrate.rollback()
    return await testDb.destroy()
  })

  it('should insert a new user', async () => {
    const sut = makeSut()
  
    const insertedUser = await sut.save(user)
    insertedId = insertedUser.id as number
    const [fromDbUser] = await testDb('users').where({ id: insertedUser.id })

    expect(insertedUser).toBeDefined()
    expect(insertedUser).toEqual(fromDbUser)
  })

  it('should throw an error if has duplicated usernames', async () => {
    const sut = makeSut()

    await expect(sut.save(user)).rejects.toThrowError()
  })

  it('should return null if no user was found with the given username and password', async () => {
    const sut = makeSut()

    const user = await sut.findByUsername('')

    expect(user).toBeNull()
  })

  it('should return the correspondent user by the given username and password', async () => {
    const sut = makeSut()

    const findedUser = await sut.findByUsername(user.username)

    expect(findedUser).toEqual({
      id: insertedId,
      ...user
    })
  })

  it('should return the correspondent user by the given id', async () => {
    const sut = makeSut()

    const findedUser = await sut.find(insertedId)

    expect(findedUser).toEqual({
      id: insertedId,
      ...user
    })
  })

  it('should return null if no user finded with the given id', async () => {
    const sut = makeSut()

    const findedUser = await sut.find(insertedId)

    expect(findedUser).toEqual({
      id: insertedId,
      ...user
    })
  })
})
