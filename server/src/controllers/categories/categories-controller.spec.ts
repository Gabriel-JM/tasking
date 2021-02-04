import { HttpRequest } from '../../protocols/infra'
import { CategoriesController } from './categories-controller'

function makeSut() {
  const repositorySpy = {
    findAll: jest.fn()
  }

  const sut = new CategoriesController(repositorySpy)

  return {
    sut,
    repositorySpy
  }
}

describe('Categories Controller', () => {
  const httpRequest = <HttpRequest> {
    params: {},
    headers: {},
    query: {},
    body: {}
  }
  
  describe('Index', () => {
    it('should return all categories', async () => {
      const { sut, repositorySpy } = makeSut()
      repositorySpy.findAll.mockResolvedValueOnce([])

      const response = await sut.index()

      expect(response.status).toBe(200)
      expect(response.body).toEqual([])
    })
  })
})
