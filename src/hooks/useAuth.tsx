import { useContext } from 'react'
import AuthContext from '../services/auth/AuthContext'

export default function useAuth () {
  const context = useContext(AuthContext)
  return context
}
