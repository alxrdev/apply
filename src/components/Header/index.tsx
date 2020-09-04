import React from 'react'
import { Link } from 'react-router-dom'
import { FiLogOut, FiUser } from 'react-icons/fi'

import { useAuth } from '../../services/auth'

import Dropdown from '../Dropdown'

import './styles.scss'
import logoImage from '../../assets/img/logo.svg'

const Header: React.FC = ({ children }) => {
  const { user, logOut } = useAuth()

  return (
    <div className="header">
      <div className="navbar">
        <div className="logo">
          <Link to="/">
            <img src={logoImage} alt="Apply" />
          </Link>
        </div>

        <div className="right">
          { !user ? (
            <>
              <ul className="menu">
                <li><Link to="./login">Apply for a job (Free!)</Link></li>
                <li className="separator"></li>
                <li><Link to="./signup">Register a job</Link></li>
              </ul>
              <Link to="./login" className="login-button">Log In</Link>
            </>
          ) : (
            <div className="user">
              <img src='https://avatars0.githubusercontent.com/u/42560570?s=460&u=4f4dcd43b0e10b622ff4fe376151532c63958429&v=4' alt={user.name} />
              <Dropdown label={user.name.split(' ')[0]} sections={[
                {
                  id: 0,
                  borderTop: false,
                  borderBottom: true,
                  options: [
                    {
                      value: 'profile',
                      text: 'Profile',
                      icon: <FiUser size={15} />
                    }
                  ]
                },
                {
                  id: 1,
                  borderBottom: false,
                  borderTop: false,
                  options: [
                    {
                      value: 'Log Out',
                      text: 'Log Out',
                      icon: <FiLogOut size={15} />,
                      callback: (value: string) => {
                        logOut()
                      }
                    }
                  ]
                }
              ]} />
            </div>
          ) }
        </div>
      </div>

      { children }
    </div>
  )
}

export default Header
