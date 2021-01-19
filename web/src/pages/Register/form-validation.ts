import * as Yup from 'yup'

const schema = Yup.object().shape({
  name: Yup.string().required(),
  username: Yup.string().trim().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required()
})

export { schema }
