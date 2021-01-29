export class BasicAuthorizationError extends Error {
  name = 'BasicAuthorizationError'

  constructor() {
    super('Invalid Authorization format')
  }
}
