import React, { useEffect, useState } from 'react'

import api from '../../services/api'
import { User } from '../../types'
import UserApplied from '../UserApplied'

import './styles.scss'

interface Props {
  id: string
}

interface Applicant extends User {
  resume: string
}

const UsersApplied: React.FC<Props> = ({ id }) => {
  // const [users, setUsers] = useState<Array<Applicant>>()

  // useEffect(() => {
  //   api.get(`/jobs/${id}/applieds`)
  //     .then(result => {
  //       const data = result.data.data as Array<Applicant>
  //       setUsers(data)
  //     })
  //     .catch(_ => console.log('Error'))
  // }, [])

  return (
    <div className="users-applied">
      <h2>Professinals Applied</h2>

      <div className="users-applied-list">
        <UserApplied />
        <UserApplied />
        <UserApplied />
      </div>
    </div>
  )
}

export default UsersApplied
