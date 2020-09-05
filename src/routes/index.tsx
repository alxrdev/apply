import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import ProtectedRoute from './ProtectedRoute'
import AuthRoute from './AuthRoute'

import Home from '../pages/Home'
import Jobs from '../pages/Jobs'
import LogIn from '../pages/LogIn'
import SignUp from '../pages/SignUp'
import ForgotPassword from '../pages/ForgotPassword'
import Apply from '../pages/Apply'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/jobs' component={Jobs} />

      <AuthRoute path='/login' component={LogIn} />
      <AuthRoute path='/signup' component={SignUp} />
      <AuthRoute path='/forgot-password' component={ForgotPassword} />

      <ProtectedRoute path='/apply/:id' component={Apply} />
    </Switch>
  </BrowserRouter>
)

export default Routes
