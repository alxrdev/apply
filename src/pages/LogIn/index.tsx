import React from 'react'
import { Link } from 'react-router-dom'

import SimpleHeader from '../../components/SimpleHeader'

import './styles.scss'

const LogIn = () => (
  <div className="login">
    <SimpleHeader />

    <div className="container-small">
      <h1 className='title'>Log In</h1>

      <form action="#">
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>

        <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>

        <button type="button" className="button button-primary button-block">Log In</button>
      </form>

      <p className="dont-have-account">Don&apos;t have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  </div>
)

export default LogIn
