import React from 'react'

import Header from '../../components/Header'
import Container from '../../components/Container'
import BackButton from '../../components/BackButton'
import UpdateProfile from '../../components/UpdateProfile'
import UpdateAvatar from '../../components/UpdateAvatar'

import './styles.scss'

const EditProfile: React.FC = () => {
  return (
    <div className="edit-profile">
      <Header />

      <Container>
        <div className="edit-profile-content">
          <div className="actions">
            <BackButton text='Back to profile' />
          </div>

          <div>
            <h1>Update Profile</h1>

            <UpdateAvatar />

            <UpdateProfile />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default EditProfile
