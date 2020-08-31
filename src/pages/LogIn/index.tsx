import React from 'react'
import { Link } from 'react-router-dom'

import SimpleHeader from '../../components/SimpleHeader'
import SmallContainer from '../../components/SmallContainer'
import InputGroup from '../../components/InputGroup'
import Button from '../../components/Button'

import './styles.scss'

const LogIn = () => (
  <div className="login">
    <SimpleHeader />

    <SmallContainer>
      <h1 className='title'>Log In</h1>

      <form>
        <InputGroup
          type='email'
          id='email'
          name='email'
          label='Email'
          value=''
        />

        <InputGroup
          type='password'
          id='password'
          name='password'
          label='Password'
          value=''
        />

        <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>

        <Button type='primary' isBlock={true} content='Log In' />
      </form>

      <p className="dont-have-account">Don&apos;t have an account? <Link to="/signup">Sign up</Link></p>
    </SmallContainer>
  </div>
)

export default LogIn
