import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import ProtectedRoute from './ProtectedRoute'
import AuthRoute from './AuthRoute'

import Home from '../pages/Home'
import Jobs from '../pages/Jobs'
import Job from '../pages/Job'
import LogIn from '../pages/LogIn'
import SignUp from '../pages/SignUp'
import ForgotPassword from '../pages/ForgotPassword'
import Apply from '../pages/Apply'
import Profile from '../pages/Profile'
import EditProfile from '../pages/EditProfile'
import AddJob from '../pages/AddJob'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/jobs' component={Jobs} />
      <Route path='/job/:id' component={Job} />

      <AuthRoute path='/login' component={LogIn} />
      <AuthRoute path='/signup' component={SignUp} />
      <AuthRoute path='/forgot-password' component={ForgotPassword} />

      <ProtectedRoute path='/apply/:id' component={Apply} />
      <ProtectedRoute path='/profile' exact component={Profile} />
      <ProtectedRoute path='/profile/edit' component={EditProfile} />

      <ProtectedRoute path='/new-job' component={AddJob} />
    </Switch>
  </BrowserRouter>
)

export default Routes
