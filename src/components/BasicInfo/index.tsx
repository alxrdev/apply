import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { MdWork, MdPublic, MdEdit } from 'react-icons/md'
import { FaQuoteLeft } from 'react-icons/fa'

import { User } from '../../types'
import { useAuth } from '../../services/auth'
import api from '../../services/api'

import SmallContainer from '../SmallContainer'

import './styles.scss'

interface Props {
  id: string
}

const BasicInfo: React.FC<Props> = ({ id }) => {
  const currentUser = useAuth().user
  const [user, setUser] = useState<User>()
  const history = useHistory()

  useEffect(() => {
    api.get(`/users/${id}`)
      .then(result => {
        const data = result.data.data as User
        setUser(data)
      })
      .catch(error => { console.log(error) })
  }, [])

  return (
    <SmallContainer>
      { user && (
        <div className="basic-info">
          <div className="avatar">
            <img src={user.avatar} alt={user.name} />
          </div>
          <ul className="infos">
            { currentUser && currentUser.id === user.id && (
              <span
                className='edit-button'
                onClick={() => history.push('/profile/edit')}
              >
                <MdEdit size={15} />
              </span>
            ) }

            <li className="name">
              <h1>{user.name}</h1>
            </li>
            <li className="occupation-area">
              <MdWork size={15} />
              <span>{ user.headline }</span>
            </li>
            <li className="location">
              <MdPublic size={15} />
              <span>{ user.address }</span>
            </li>
            <li className="bio">
              <FaQuoteLeft size={15} />
              <span>{ user.bio }</span>
            </li>
          </ul>
        </div>
      ) }
    </SmallContainer>
  )
}

export default BasicInfo
