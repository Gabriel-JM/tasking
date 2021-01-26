import { api } from '../api'

interface UserToRegister {
  name: string
  username: string
  email: string
  password: string
}

interface toLoginData {
  username: string
  password: string
}

class LoginService {
  async login(loginData: toLoginData) {
    const response = await api.get('/login', {
      authorization: btoa(`${loginData.username}:${loginData.password}`)
    })

    return response
  }

  async refresh(token: string) {
    const response = await api.post('/login/verify', { token })

    return response
  }

  async register(user: UserToRegister) {
    const response = await api.post('/signup', user)

    return response
  }
}

export default new LoginService()
