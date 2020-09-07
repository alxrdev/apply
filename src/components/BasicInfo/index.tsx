import React from 'react'
import { FiBriefcase, FiMapPin } from 'react-icons/fi'
import { FaQuoteLeft } from 'react-icons/fa'

import { User } from '../../types'

import './styles.scss'

interface Props {
  user: User
}

const BasicInfo: React.FC<Props> = ({ user }) => {
  return (
    <div className="basic-info">
      <div className="avatar">
        <img src={user.avatar} alt={user.name} />
      </div>
      <ul className="infos">
        <li className="name">
          <h1>{user.name}</h1>
        </li>
        <li className="occupation-area">
          <FiBriefcase size={15} />
          <span>UX Designer</span>
        </li>
        <li className="location">
          <FiMapPin size={15} />
          <span>São Mateus, ES</span>
        </li>
        <li className="bio">
          <FaQuoteLeft size={15} />
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, tempora.</span>
        </li>
      </ul>
    </div>
  )
}

export default BasicInfo
