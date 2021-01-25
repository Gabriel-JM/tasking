import request from 'supertest'
import { connectionDatabase } from '../../../resources/database/connection'
import { app } from '../../app'

const testDb = connectionDatabase('test')

describe('Login Routes', () => {
  beforeAll(async () => {
    await testDb.migrate.latest()
  })

  afterAll(async () => {
    await testDb.migrate.rollback()
    return await testDb.destroy()
  })

  it('should return a 200 response with user credentials', async () => {
    const newUser = {
      username: 'any_user',
      name: 'user name',
      email: 'any@email.com',
      password: 'any_password'
    }

    await testDb('users').insert(newUser)

    const encryptedCredentials = Buffer
      .from(`${newUser.username}:${newUser.password}`)
      .toString('base64')
    ;

    const response = await request(app)
      .get('/login')
      .set('authorization', `Basic ${encryptedCredentials}`)
    ;

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body).toHaveProperty('token')
  })

  it('should return a 406 response, if request don\'t have authorization field', async () => {
    const response = await request(app).get('/login')

    expect(response.status).toBe(406)
    expect(response.body).toEqual({
      field: 'authorization',
      error: 'Authorization field cannot be empty'
    })
  })
})
