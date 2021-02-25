import { HttpRequest } from '../../protocols/infra'
import { CategoriesController } from './categories-controller'

function makeSut() {
  const repositorySpy = {
    findAllByUserId: jest.fn(),
    save: jest.fn()
  }

  const sessionUsecaseSpy = {
    extractUser: jest.fn()
  }

  const sut = new CategoriesController(repositorySpy, sessionUsecaseSpy)

  return {
    sut,
    repositorySpy,
    sessionUsecaseSpy
  }
}

describe('Categories Controller', () => {
  const httpRequest = <HttpRequest> {
    params: {},
    headers: {
      authorization: 'any_auth_token'
    },
    query: {},
    body: {
      name: 'any_name',
      color: '#ff7788',
      user: 1
    }
  }
  
  describe('Index', () => {
    it('should return all categories', async () => {
      const { sut, repositorySpy, sessionUsecaseSpy } = makeSut()
      sessionUsecaseSpy.extractUser.mockResolvedValueOnce({
        ok: true,
        data: { id: 1 }
      })
      repositorySpy.findAllByUserId.mockResolvedValueOnce([])

      const response = await sut.index(httpRequest)

      expect(response.status).toBe(200)
      expect(response.body).toEqual([])
    })
  })

  describe('Create', () => {
    it('should return a 200 response with the newly created category', async () => {
      const { sut, repositorySpy } = makeSut()
      repositorySpy.save.mockResolvedValueOnce({
        id: 1,
        ...httpRequest.body
      })
      
      const response = await sut.create(httpRequest)

      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        id: 1,
        ...httpRequest.body
      })
    })
  })
})
