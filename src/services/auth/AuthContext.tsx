import React from 'react'
import { APIErrorResponse } from '../../types'

export interface IAuthUser {
  id: string
  name: string
  email: string
  role: string
  avatar: string
}

interface IAuthContext {
  user: IAuthUser | null
  logIn (email: string, password: string): Promise<APIErrorResponse | void>
  logOut (): void
}

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext)

export default AuthContext
