import * as yup from 'yup'

const schema = yup.object().shape({
  username: yup.string()
    .trim()
    .required('Required Field'),
  password: yup.string()
    .required('Required Field')
})

export { schema }
