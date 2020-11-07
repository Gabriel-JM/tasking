import { IEmailValidator } from '../../../protocols/utils'

export class EmailValidator implements IEmailValidator {
  isValid(email: string) {
    return true
  }
}
