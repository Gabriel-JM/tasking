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
        username: 'any.user',
        password: 'any.password'
      })
    ;

    expect(response.status).toBe(200)
    expect(response.body.id).toBeGreaterThanOrEqual(1)
    expect(response.body.username).toBe('any.user')
    expect(response.body.token).toBeDefined()
    done()
  })
})
