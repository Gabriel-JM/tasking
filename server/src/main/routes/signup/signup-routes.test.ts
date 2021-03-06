import request from 'supertest'
import { connectionDatabase } from '../../../resources/database/connection'
import { app } from '../../app'

const testDb = connectionDatabase('test')

describe('Signup Routes', () => {
  beforeAll(async () => {
    await testDb.migrate.latest()
  })

  afterAll(async () => {
    await testDb.migrate.rollback()
    return await testDb.destroy()
  })
  
  it('should return a 200 response, with the newly user', async done => {
    const response = await request(app)
      .post('/signup')
      .send({
        name: 'user name',
        username: 'any.user',
        email: 'user@email.com',
        password: 'any.password'
      })
    ;

    expect(response.status).toBe(200)
    expect(response.body.id).toBeGreaterThanOrEqual(1)
    expect(response.body.username).toBe('any.user')
    expect(response.body.token).toBeDefined()
    done()
  })

  it('should return a 400 response, with the correct error', async done => {
    const response = await request(app)
      .post('/signup')
      .send({
        name: 'user name',
        username: 'any.user',
        email: 'invalid_email.com',
        password: 'any.password'
      })
    ;

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      field: 'email',
      error: 'Invalid e-mail'
    })
    done()
  })
})
