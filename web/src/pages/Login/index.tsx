import React from 'react'
import InputField from '../../components/Forms/InputField'
import { useForm } from 'react-hook-form'
import './login.css'

interface LoginData {
  username: string
  password: string
}

function Login() {
  const { register, handleSubmit, errors } = useForm<LoginData>()

  function onFormSubmit(data: LoginData) {
    console.log('data', data)
  }

  return (
    <section className="login-container">
      <form className="login-form" onSubmit={handleSubmit(onFormSubmit)}>
        <InputField
          label="Username"
          required
          name="username"
          placeholder="example.name"
          ref={register}
        />
        <InputField
          label="Password"
          type="password"
          required
          name="password"
          placeholder="secret_password"
          ref={register}
        />
        <button className="btn primary">Login</button>
      </form>
    </section>
  )
}

export default Login
