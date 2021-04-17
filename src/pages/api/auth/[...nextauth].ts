import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import api from '../../../services/api'
import { APIAuthResponse, APIErrorResponse, IAuthUser } from '../../../types'

const providers = [
  Providers.Credentials({
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'email', placeholder: 'example@example.com' },
      password: { label: 'Password', type: 'password', placeholder: 'Type your password' }
    },
    authorize: async (credentials) => {
      const { email, password } = credentials

      try {
        const response = await api.post('/auth', { email, password })
        const data = response.data.data as APIAuthResponse

        return { token: data.token }
      } catch (error) {
        if (error.response) {
          const data = error.response.data as APIErrorResponse
          throw new Error(JSON.stringify(data))
        }
      }

      throw new Error(JSON.stringify({
        error_message: 'Sorry, we have an internal server error :(',
        error_status_code: 501,
        message: 'Sorry, we have an internal server error :(',
        success: false
      }))
    }
  })
]

const callbacks = {
  async jwt (token: any, apiResponse: any) {
    if (apiResponse) {
      token.accessToken = apiResponse.token
    }
    return token
  },

  async session (session: any, token: any) {
    session.accessToken = token.accessToken
    session.user = await getUserData(token.accessToken)
    return session
  }
}

const options = {
  providers,
  callbacks
}

async function getUserData (accessToken: string) : Promise<IAuthUser> {
  const response = await api.get('/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  return response.data.data as IAuthUser
}

export default (request: NextApiRequest, response: NextApiResponse) => NextAuth(request, response, options)
