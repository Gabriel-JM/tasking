import { LoginController } from '../../controllers/login/login-controller'
import { EnvironmentOptions } from '../../protocols/infra'
import { LoginRepository } from '../../repositories/login/login-repository'
import { connectionDatabase } from '../../resources/database/connection'
import { EmailValidator } from '../../utils/helpers/email-validator'
import { TextHasher } from '../../utils/helpers/hasher/text-hasher'
import { AuthHeaderParser } from '../../utils/helpers/header-parser/auth-header-parser'
import { Tokenizer } from '../../utils/helpers/token/tokenizer'

export default () => {
  const passwordHasher = new TextHasher()
  const tokenGenerator = new Tokenizer(process.env.SECRET_KEY as string)
  const emailValidator = new EmailValidator()
  const authHeaderParser = new AuthHeaderParser()

  const knexDB = connectionDatabase(process.env.NODE_ENV as EnvironmentOptions)
  const loginRepository = new LoginRepository('users', knexDB)

  const loginController = new LoginController(
    loginRepository,
    passwordHasher,
    tokenGenerator,
    emailValidator,
    authHeaderParser
  )

  return loginController
}
