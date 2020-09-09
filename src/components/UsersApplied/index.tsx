import React, { useEffect, useState } from 'react'

import './styles.scss'

interface Props {
  id: string
}

const UsersApplied: React.FC<Props> = ({ id }) => {
  const [users, setUsers] = useState()

  useEffect(() => {
    //
  }, [])

  return (
    <div className="users-applied">
      <h2>Users Applied</h2>
    </div>
  )
}

export default UsersApplied
