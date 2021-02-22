import { JsonWebTokenError } from 'jsonwebtoken'
import { UserVerification } from '.'
import { BearerAuthorizationError } from '../../../utils/errors/bearer-authorization-error'

function makeSut() {
  const tokenGeneratorSpy = {
    generate: jest.fn(),
    verify: jest.fn()
  }
  const headerParserSpy = {
    basic: jest.fn(),
    bearer: jest.fn()
  }

  const sut = new UserVerification(tokenGeneratorSpy, headerParserSpy)

  return {
    sut,
    tokenGeneratorSpy,
    headerParserSpy
  }
}

describe('User Verification Middleware', () => {
  it('should return a 406 response if no authorization field was provided', () => {
    const { sut } = makeSut()

    const response = sut.verify({
      url: '/',
      headers: {},
      params: {},
      query: {},
      body: {}
    })

    expect(response.success).toBe(false)
    expect(response.response?.status).toBe(406)
    expect(response.response?.body).toEqual({
      field: 'authorization',
      error: 'Authorization field cannot be empty'
    })
  })

  it('should return a success response, if everything is all right', () => {
    const { sut, tokenGeneratorSpy, headerParserSpy } = makeSut()

    tokenGeneratorSpy.verify.mockReturnValueOnce(true)
    headerParserSpy.bearer.mockReturnValueOnce('token')

    const response = sut.verify({
      url: '/',
      headers: {
        authorization: 'Bearer token'
      },
      params: {},
      query: {},
      body: {}
    })

    expect(response.success).toBe(true)
    expect(response.response).toBeUndefined()
  })

  it('should return a success response, if was a login or signup paths', () => {
    const { sut } = makeSut()

    const response = sut.verify({
      url: '/login',
      headers: {},
      params: {},
      query: {},
      body: {}
    })

    expect(response.success).toBe(true)
    expect(response.response).toBeUndefined()
  })

  describe('should return the correct response by the given error', () => {
    const { sut, tokenGeneratorSpy, headerParserSpy } = makeSut()
    
    test('JsonWebToken Error', () => {
      tokenGeneratorSpy.verify.mockImplementationOnce(
        () => { throw new JsonWebTokenError('jwt error') }
      )

      const response = sut.verify({
        body: {},
        headers: {
          authorization: 'Bearer token'
        },
        params: {},
        query: {},
        url: '/'
      })

      expect(response.success).toBe(false)
      expect(response.response?.status).toBe(406)
      expect(response.response?.body).toEqual({
        field: 'token',
        error: 'jwt error'
      })
    })

    test('Bearer Authorization Header Parser Error', () => {
      headerParserSpy.bearer.mockImplementationOnce(
        () => { throw new BearerAuthorizationError() }
      )

      const response = sut.verify({
        body: {},
        headers: {
          authorization: 'bearer token'
        },
        params: {},
        query: {},
        url: '/'
      })

      expect(response.success).toBe(false)
      expect(response.response?.status).toBe(500)
      expect(response.response?.body).toEqual({
        field: '',
        error: 'Invalid Authorization format'
      })
    })
  })
})
