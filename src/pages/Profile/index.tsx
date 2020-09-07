import React, { useState, useEffect } from 'react'
import { useAuth } from '../../services/auth'

import { User } from '../../types'
import api from '../../services/api'

import Header from '../../components/Header'
import Container from '../../components/Container'
import BasicInfo from '../../components/BasicInfo'
import JobsApplied from '../../components/JobsApplied'

import './styles.scss'

const Profile: React.FC = () => {
  const { user } = useAuth()
  const [currentUser, setCurrentUser] = useState<User>()

  useEffect(() => {
    if (user) {
      api.get(`/users/${user.id}`)
        .then(result => {
          const data = result.data.data as User
          setCurrentUser(data)
        })
        .catch(error => { console.log(error) })
    }
  }, [])

  return (
    <div className="user-profile">
      { currentUser && (
        <>
          <Header>
            <Container>
              <BasicInfo user={currentUser} />
            </Container>
          </Header>

          <div className="user-profile-content">
            <Container>
              {
                currentUser.role === 'user'
                  ? (<JobsApplied user={currentUser} />)
                  : (<div>employeer</div>)
              }
            </Container>
          </div>
        </>
      ) }
    </div>
  )
}

export default Profile
