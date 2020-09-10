import React from 'react'
import { Link } from 'react-router-dom'
import { MdWork, MdPublic, MdAttachment } from 'react-icons/md'
import { FaQuoteLeft } from 'react-icons/fa'

import './styles.scss'

const UserApplied: React.FC = () => {
  return (
    <div className="user-applied">
      <div className="main">
        <div className="avatar">
          <img src='http://localhost:3333/api/avatar/1210eae2d6ddc62516d7-1598545131961.jpeg' alt='' />
        </div>

        <div className="infos">
          <div className="name">
            <h5>Alex Rodrigues Moreira</h5>
          </div>
          <div className="occupation-area">
            <MdWork size={15} />
            <span>UX Designer</span>
          </div>
          <div className="location">
            <MdPublic size={15} />
            <span>São Mateus, ES</span>
          </div>
          <div className="bio">
            <FaQuoteLeft size={15} />
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, tempora.</span>
          </div>
        </div>
      </div>

      <a href='#' target='_blank' className="resume">
        <MdAttachment size={20} />
        <span>resume.pdf</span>
      </a>
    </div>
  )
}

export default UserApplied
