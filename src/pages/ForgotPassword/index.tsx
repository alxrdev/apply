import React from 'react'
import { Link } from 'react-router-dom'

import SimpleHeader from '../../components/SimpleHeader'

import './styles.scss'

const ForgotPassword = () => (
  <div className="forgot-password">
    <SimpleHeader />

    <div className="container-small">
      <h1 className='title'>Recover your password</h1>

      <form action="#">
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
        </div>

        <button type="button" className="button button-primary button-block">Send</button>
      </form>

      <p className="dont-have-account">Don&apos;t have an account? <Link to="signup">Sign up</Link></p>
    </div>
  </div>
)

export default ForgotPassword
