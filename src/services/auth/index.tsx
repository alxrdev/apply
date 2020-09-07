import React, { useState, useContext, useEffect } from 'react'

import api from '../api'

import AuthContext, { IAuthUser } from './AuthContext'
import { APIErrorResponse } from '../../types'
import { useCookies } from 'react-cookie'

interface APIAuthResponse {
  user: IAuthUser
  token: string
}

export const AuthProvider: React.FC = ({ children }) => {
  const [cookies, setCookies, removeCookies] = useCookies(['@Apply:user'])
  const [user, setUser] = useState<IAuthUser | null>(null)

  useEffect(() => {
    const userAuth = cookies['@Apply:user']

    if (userAuth) {
      console.log('Trying to authenticate user...')
      api.post('/refresh-token')
        .then(result => {
          console.log('User authenticated...')
          const response = result.data.data as APIAuthResponse
          setUser(response.user)
          storeUserAuth(response.user)
        })
        .catch(_ => {
          setUser(null)
          console.log('User not authenticated...')
        })
    }
  }, [])

  const logIn = async (email: string, password: string): Promise<APIErrorResponse | void> => {
    try {
      const { data } = await api.post('auth', { email, password })

      const response = data.data as APIAuthResponse

      setUser(response.user)

      storeUserAuth(response.user)
    } catch (error) {
      if (error.response) {
        const data: APIErrorResponse = error.response.data
        return data
      } else {
        return {
          error_message: 'Sorry, we have an internal server error :(',
          error_status_code: 501,
          message: 'Sorry, we have an internal server error :(',
          success: false
        }
      }
    }
  }

  const logOut = (): void => {
    removeCookies('@Apply:user', { path: '/' })
    setUser(null)
  }

  const storeUserAuth = (user: IAuthUser): void => {
    setCookies('@Apply:user', user.id, { path: '/' })
  }

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      { children }
    </AuthContext.Provider>
  )
}

export function useAuth () {
  const context = useContext(AuthContext)
  return context
}
