import { Category } from '../../models'

export interface ICategoriesRepository {
  findAllByUserId(userId: number): Promise<Category[]>
  save(data: Category): Promise<Category>
}
