import React from 'react'
import { Link } from 'react-router-dom'

import SimpleHeader from '../../components/SimpleHeader'

import './styles.scss'

const SignUp = () => (
  <div className="signup">
    <SimpleHeader />

    <div className="container-small">
      <h1 className='title'>Sign up for a free account!</h1>

      <form action="#">
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>

        <div className="input-group">
          <label htmlFor="confirmPassword">Repeat the password</label>
          <input type="password" id="confirmPassword" />
        </div>

        <div className="input-group">
          <label htmlFor="role">I am a</label>
          <select id="role">
            <option value="user" selected>User</option>
            <option value="employeer">Employeer</option>
          </select>
        </div>

        <button type="button" className="button button-primary button-block">Sign Up</button>
      </form>

      <p className="already-have-account">Already have an account? <Link to="login">Log In</Link></p>
    </div>
  </div>
)

export default SignUp
