import { Entity } from './entity'
import { User } from './user'

export interface Category extends Entity {
  name: string
  color: string
  user: number | User
}
