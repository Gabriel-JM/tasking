import { EmailValidator } from './index'

describe('Email validator', () => {
  const emailValidator = new EmailValidator()

  it('should return false, if an invalid email is provided', () => {
    const invalidEmails = [
      'hgdfdf',
      '@dkjdf',
      'fdjkldf@dfdf',
      '1354321',
      '321#@dfdf_von',
      '@.com'
    ]

    for(const email of invalidEmails) {
      const isValid = emailValidator.isValid(email)
      expect(isValid).toBe(false)
    }
  })

  it('should return true, if a valid email is provided', () => {
    const validEmails = [
      'g@g.com',
      '123@34.me',
      'pessoa@email.com',
      'nome.pessoa@email.com'
    ]

    for(const email of validEmails) {
      const isValid = emailValidator.isValid(email)
      expect(isValid).toBe(true)
    }
  })
})
