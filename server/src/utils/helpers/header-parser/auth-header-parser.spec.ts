import { BasicAuthorizationError } from '../../errors/basic-authorization-error'
import { BearerAuthorizationError } from '../../errors/bearer-authorization-error'
import { AuthHeaderParser } from './auth-header-parser'

describe('Auth Header Parser', () => {
  const sut = new AuthHeaderParser()

  describe('Basic', () => {
    it('should return throw an error if the authorization credentials are invalid', () => {
      expect(
        () => sut.basic('random text')
      ).toThrowError(BasicAuthorizationError)
    })

    it('should return username and password from valid authorization credentials', () => {
      const userData = 'any_username:any_password'
      const b64UserData = Buffer.from(userData).toString('base64')
      const credentials = `Basic ${b64UserData}`

      const result = sut.basic(credentials)
      expect(result).toEqual(userData.split(':'))
    })
  })

  describe('Bearer', () => {
    it('should return throw an error if the authorization token is invalid', () => {
      expect(
        () => sut.bearer('random text')
      ).toThrowError(BearerAuthorizationError)
    })

    it('should return the token from valid authoration string', () => {
      const token = 'Bearer any_token'

      const result = sut.bearer(token)
      expect(result).toBe('any_token')
    })
  })
})
