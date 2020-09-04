import React, { useState, useContext, useEffect } from 'react'

import api from '../api'

import AuthContext, { IAuthUser } from './AuthContext'
import { APIErrorResponse } from '../../types'

interface APIAuthResponse {
  user: IAuthUser
  token: string
}

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IAuthUser | null>(null)

  useEffect(() => {
    const user = localStorage.getItem('@Apply:user')

    if (user) {
      console.log('Trying to authenticate user...')
      api.post('/refresh-token')
        .then(result => {
          console.log('User authenticated...')
          console.log(result)
          const response = result.data.data as APIAuthResponse
          setUser(response.user)
          localStorage.setItem('@Apply:user', JSON.stringify(response.user))
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

      localStorage.setItem('@Apply:user', JSON.stringify(response.user))
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
    localStorage.removeItem('@Apply:user')
    setUser(null)
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
