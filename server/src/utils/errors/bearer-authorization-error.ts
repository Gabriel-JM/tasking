export class BearerAuthorizationError extends Error {
  name = 'BearerAuthorizationError'

  constructor() {
    super('Invalid Authorization format')
  }
}
