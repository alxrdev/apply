import React from 'react'
import { useAuth } from '../../services/auth'

import Header from '../../components/Header'
import Container from '../../components/Container'
import BackButton from '../../components/BackButton'
import BasicInfo from '../../components/BasicInfo'
import JobsApplied from '../../components/JobsApplied'
import EmployeerJobs from '../../components/EmployeerJobs'

import './styles.scss'

const Profile: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="user-profile">
      <Header />

      { user && (
        <Container>
          <div className="actions">
            <BackButton text='Back' />
          </div>

          <div className="user-profile-content">
            <BasicInfo id={user.id} />

            {
              user.role === 'user'
                ? (<JobsApplied id={user.id} />)
                : (<EmployeerJobs id={user.id} />)
            }
          </div>
        </Container>
      ) }
    </div>
  )
}

export default Profile
