import React from 'react'
import { Link } from 'react-router-dom'

import './styles.scss'
import logoImage from '../../assets/img/logo.svg'

const SimpleHeader = () => (
  <div className='simple-header'>
    <Link to='/'>
      <img src={logoImage} alt='Apply' />
    </Link>
  </div>
)

export default SimpleHeader
