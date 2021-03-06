import React from 'react'
import InputField from '../../components/Forms/InputField'
import { useForm } from 'react-hook-form'
import { getInputFieldError } from '../../utils'
import { schema } from './form-validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../providers/auth'
import loginService from '../../services/login'

import './login.css'

interface LoginData {
  username: string
  password: string
}

function Login() {
  const { signIn } = useAuth()
  const history = useHistory()
  const { register, handleSubmit, errors } = useForm<LoginData>({
    resolver: yupResolver(schema)
  })

  async function onFormSubmit(data: LoginData) {
    try {
      const response = await loginService.login(data)

      if(response.ok) {
        signIn(response.data)
        history.push('/dashboard')
      }
    } catch(catchedError) {
      console.dir(catchedError)
    }
  }

  return (
    <section className="login-container">
      <header className="login-header">
        <h3>Login</h3>
      </header>

      <form className="login-form" onSubmit={handleSubmit(onFormSubmit)}>
        <InputField
          label="Username"
          required
          name="username"
          placeholder="example.name"
          onInput={e => {
            const input = e.target as HTMLInputElement
            input.value = input.value.replace(/\s+/g, '')
          }}
          ref={register({ required: true })}
          errors={getInputFieldError(errors.username)}
        />
        <InputField
          label="Password"
          type="password"
          required
          name="password"
          placeholder="secret_password"
          ref={register({ required: true })}
          errors={getInputFieldError(errors.password)}
        />

        <button className="btn primary">Login</button>
      </form>
      <span className="require-message">Required fields.</span>

      <div className="register-link-container">
        <span>Don't have an account?</span>
        <Link className="register-link" to="/register">Register</Link>
      </div>
    </section>
  )
}

export default Login
