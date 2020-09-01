import React from 'react'
import { Link } from 'react-router-dom'

import './styles.scss'
import logoImage from '../../assets/img/logo.svg'

const Header: React.FC = ({ children }) => (
  <div className="header">
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logoImage} alt="Apply" />
        </Link>
      </div>

      <div className="right">
        <ul className="menu">
          <li><Link to="./login">Apply for a job (Free!)</Link></li>
          <li className="separator"></li>
          <li><Link to="./signup">Register a job</Link></li>
        </ul>
        <Link to="./login" className="login-button">Log In</Link>
      </div>
    </div>

    { children }
  </div>
)

export default Header
