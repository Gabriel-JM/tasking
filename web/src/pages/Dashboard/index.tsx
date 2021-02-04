import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../providers/auth'

function Dashboard() {
  const { user, isAuth, isAuthLoading } = useAuth()
  const history = useHistory()

  if(!isAuthLoading && !isAuth) {
    history.push('/')
    return null
  }

  return (
    <div className="container">
      <h2>Bem vindo! {user.name}</h2>
    </div>
  )
}

export default Dashboard
