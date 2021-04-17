import { createContext, useState, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'

import api from '../services/api'
import { APIErrorResponse, IAuthUser, APIAuthResponse } from '../types'

interface IAuthContext {
  user: IAuthUser | null
  logIn: (email: string, password: string) => Promise<APIErrorResponse | void>
  logOut: () => void
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider ({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IAuthUser | null>(null)

  useEffect(() => {
    const { applyAuthUser } = Cookies.get()

    if (applyAuthUser) {
      console.log('Trying to authenticate user...')
      api.post('/refresh-token')
        .then(result => {
          console.log('User authenticated...')
          const response = result.data.data as APIAuthResponse
          setUser(response.user)
          storeUserAuth(response.user)
        })
        .catch(error => {
          console.log(error.response.data)
          setUser(null)
          console.log('User not authenticated...')
        })
    } else {
      console.log('User not authenticated...')
    }
  }, [])

  function storeUserAuth (user: IAuthUser): void {
    const cookieExpiresDate = () => {
      const date = new Date()
      date.setDate(date.getDate() + 15)
      return date
    }

    Cookies.set('applyAuthUser', user.id, { path: '/', expires: cookieExpiresDate() })
  }

  const logIn = async (email: string, password: string): Promise<APIErrorResponse | void> => {
    try {
      const { data } = await api.post('auth', { email, password })

      const response = data.data as APIAuthResponse

      setUser(response.user)

      storeUserAuth(response.user)
    } catch (error) {
      if (error.response) {
        return error.response.data as APIErrorResponse
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
    Cookies.remove('applyAuthUser', { path: '/' })
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      { children }
    </AuthContext.Provider>
  )
}
