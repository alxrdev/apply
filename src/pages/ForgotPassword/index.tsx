import React from 'react'
import { Link } from 'react-router-dom'

import SimpleHeader from '../../components/SimpleHeader'
import SmallContainer from '../../components/SmallContainer'
import InputGroup from '../../components/InputGroup'
import Button from '../../components/Button'

import './styles.scss'

const ForgotPassword = () => (
  <div className="forgot-password">
    <SimpleHeader />

    <SmallContainer>
      <h1 className='title'>Recover your password</h1>

      <form>
        <InputGroup
          type='email'
          id='email'
          name='email'
          label='Email'
          value=''
        />

        <Button type='primary' isBlock={true} content='Send' />
      </form>

      <p className="dont-have-account">Don&apos;t have an account? <Link to="/signup">Sign up</Link></p>
    </SmallContainer>
  </div>
)

export default ForgotPassword
