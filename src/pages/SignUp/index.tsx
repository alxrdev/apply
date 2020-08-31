import React from 'react'
import { Link } from 'react-router-dom'

import SimpleHeader from '../../components/SimpleHeader'
import SmallContainer from '../../components/SmallContainer'
import InputGroup from '../../components/InputGroup'
import SelectGroup from '../../components/SelectGroup'
import Button from '../../components/Button'

import './styles.scss'

const SignUp = () => (
  <div className="signup">
    <SimpleHeader />

    <SmallContainer>
      <h1 className='title'>Sign up for a free account!</h1>

      <form>
        <InputGroup
          type='text'
          id='name'
          name='name'
          label='Name'
          value=''
          required={true}
        />

        <InputGroup
          type='email'
          id='email'
          name='email'
          label='Email'
          value=''
          required={true}
        />

        <InputGroup
          type='password'
          id='password'
          name='password'
          label='Password'
          value=''
          required={true}
        />

        <InputGroup
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          label='Confirm Password'
          value=''
          required={true}
        />

        <SelectGroup
          id='role'
          name='role'
          label="I'm a"
          value='user'
          options={[
            { value: 'user', text: 'User' },
            { value: 'employeer', text: 'Employeer' }
          ]}
        />

        <Button type='primary' content='Sign Up' isBlock={true} />
      </form>

      <p className="already-have-account">Already have an account? <Link to="login">Log In</Link></p>
    </SmallContainer>
  </div>
)

export default SignUp
