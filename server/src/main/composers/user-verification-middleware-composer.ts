import { UserVerification } from '../../resources/middlewares/user-verification'
import { AuthHeaderParser } from '../../utils/helpers/header-parser/auth-header-parser'
import { Tokenizer } from '../../utils/helpers/token/tokenizer'

export default () => {
  const tokenGenerator = new Tokenizer(process.env.SECRET_KEY as string)
  const headerParser = new AuthHeaderParser()

  const userVerificationMiddleware = new UserVerification(
    tokenGenerator,
    headerParser
  )

  return userVerificationMiddleware
}
