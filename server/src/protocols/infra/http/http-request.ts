import { StringKeyAccess } from '../../utils'

export interface HttpRequest {
  headers: StringKeyAccess
  params: StringKeyAccess
  query: StringKeyAccess
  body: object | object[]
}
