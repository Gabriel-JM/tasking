import React from 'react'
import { Link } from 'react-router-dom'
import InputField from '../../components/Forms/InputField'

function Register() {
  return (
    <section className="register-container">
      <form>
        <InputField label="Name" />
        <InputField label="Username" />
        <InputField label="E-mail" />
        <InputField label="Password" />

        <button className="btn primary">Done</button>
        <Link to="/">
          <button className="btn">Cancel</button>
        </Link>
      </form>
    </section>
  )
}

export default Register
