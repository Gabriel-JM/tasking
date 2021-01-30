import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Register from '../pages/Register'

function AppRouter() {
  return (
    <Switch>
      <Route path='/' exact component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/dashboard' component={Dashboard} />
    </Switch>
  )
}

export default AppRouter
