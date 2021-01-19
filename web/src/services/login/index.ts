import { api } from '../api'

interface UserToRegister {
  name: string
  username: string
  email: string
  password: string
}

class LoginService {
  async register(user: UserToRegister) {
    const response = await api.post('/signup', user)

    return response
  }
}

export default new LoginService()
