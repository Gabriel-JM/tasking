import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import InputField from '../../components/Forms/InputField'
import { getInputFieldError } from '../../utils'
import { schema } from './form-validation'
import loginService from '../../services/login'
import { useAuth } from '../../providers/auth'
import './register.css'

interface RegisterData {
  name: string
  username: string
  email: string
  password: string
}

function Register() {
  const { signIn } = useAuth()
  const history = useHistory()
  const { register, errors, handleSubmit } = useForm<RegisterData>({
    resolver: yupResolver(schema)
  })

  async function onFormSubmit(data: RegisterData) {
    const response = await loginService.register(data)

    if(response.ok) {
      signIn(response.data)
      history.push('/')
    }
  }

  return (
    <section className="register-container">
      <h2 className="register-title">Register</h2>

      <form className="register-form" onSubmit={handleSubmit(onFormSubmit)}>
        <InputField
          required
          label="Name"
          name="name"
          ref={register({ required: true })}
          errors={getInputFieldError(errors.name)}
        />
        <InputField
          required
          label="Username"
          name="username"
          ref={register({ required: true })}
          errors={getInputFieldError(errors.username)}
        />
        <InputField
          required
          label="E-mail"
          name="email"
          ref={register({ required: true })}
          errors={getInputFieldError(errors.email)}
        />
        <InputField
          type="password"
          required
          label="Password"
          name="password"
          ref={register({ required: true })}
          errors={getInputFieldError(errors.password)}
        />

        <div className="register-form-actions">
          <button className="btn primary">Done</button>
          <Link to="/">
            <button className="btn">Cancel</button>
          </Link>
        </div>
      </form>
    </section>
  )
}

export default Register
