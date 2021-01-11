import React from 'react'
import { MdWork, MdPublic, MdAttachment } from 'react-icons/md'
import { FaQuoteLeft } from 'react-icons/fa'

import { UserApplied as UserAppliedEntity } from '../../types'

import './styles.scss'

interface Props {
  user: UserAppliedEntity
}

const UserApplied: React.FC<Props> = ({ user: { user, resume } }) => {
  return (
    <div className="user-applied">
      <div className="main">
        <div className="avatar">
          <img src={user.avatar} alt={user.name} />
        </div>

        <div className="infos">
          <div className="name">
            <h5>{ user.name }</h5>
          </div>
          <div className="occupation-area">
            <MdWork size={15} />
            <span>{ user.headline }</span>
          </div>
          <div className="location">
            <MdPublic size={15} />
            <span>{ user.address }</span>
          </div>
          <div className="bio">
            <FaQuoteLeft size={15} />
            <span>{ user.bio }</span>
          </div>
        </div>
      </div>

      <a href={resume} target='_blank' rel="noopener noreferrer" className="resume">
        <MdAttachment size={20} />
        <span>resume.pdf</span>
      </a>
    </div>
  )
}

export default UserApplied
