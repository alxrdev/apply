import { useSession } from 'next-auth/client'

import { IAuthUser } from '../types'

export default function useAuth () {
  const [session, loading] = useSession()

  return {
    user: (!session) ? null : session.user as IAuthUser,
    accessToken: (!session) ? '' : session.accessToken,
    loading
  }
}
