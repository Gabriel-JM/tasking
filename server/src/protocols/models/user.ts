import { Entity } from './entity'

export interface User extends Entity {
  name: string
  email: string
  username: string
  password: string
}
