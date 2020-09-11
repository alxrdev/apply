import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'

import { useAuth } from '../hooks'

interface Props extends RouteProps {}

const ProtectedRoute: React.FC<Props> = ({ ...props }) => {
  const { user } = useAuth()

  return (user) ? (<Route { ...props } />) : (<Redirect to='/login' />)
}

export default ProtectedRoute
