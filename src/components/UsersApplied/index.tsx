import React, { useEffect, useState } from 'react'

import api from '../../services/api'
import { UserApplied } from '../../types'
import UserAppliedComponent from '../UserApplied'

import './styles.scss'

interface Props {
  id: string
}

const UsersApplied: React.FC<Props> = ({ id }) => {
  const [users, setUsers] = useState<Array<UserApplied>>()

  useEffect(() => {
    api.get(`/jobs/${id}/users`)
      .then(result => {
        const data = result.data.data as Array<UserApplied>
        setUsers(data)
      })
      .catch(_ => console.log('Error'))
  }, [])

  return (
    <div className="users-applied">
      <h2>Users Applied</h2>

      <div className="users-applied-list">
        { users?.map(user => (
          <UserAppliedComponent key={user.user.id} user={user} />
        )) }
      </div>
    </div>
  )
}

export default UsersApplied
