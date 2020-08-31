import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import LogIn from './pages/LogIn/index'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/login' exact component={LogIn} />
      <Route path='/signup' exact component={SignUp} />
      <Route path='/forgot-password' exact component={ForgotPassword} />
    </Switch>
  </BrowserRouter>
)

export default Routes
