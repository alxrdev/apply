import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Jobs from './pages/Jobs'
import LogIn from './pages/LogIn/index'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/jobs' component={Jobs} />
      <Route path='/login' component={LogIn} />
      <Route path='/signup' component={SignUp} />
      <Route path='/forgot-password' component={ForgotPassword} />
    </Switch>
  </BrowserRouter>
)

export default Routes
