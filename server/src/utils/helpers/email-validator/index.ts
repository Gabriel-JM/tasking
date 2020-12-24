import validator from 'validator'
import { IEmailValidator } from '../../../protocols/utils'

export class EmailValidator implements IEmailValidator {
  isValid(email: string) {
    return validator.isEmail(email)
  }
}
