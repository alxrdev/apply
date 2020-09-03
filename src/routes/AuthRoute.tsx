import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'

import { useAuth } from '../services/auth'

interface Props extends RouteProps {}

const AuthRoute: React.FC<Props> = ({ ...props }) => {
  const { user } = useAuth()

  return (!user) ? (<Route { ...props } />) : (<Redirect to='/' />)
}

export default AuthRoute
