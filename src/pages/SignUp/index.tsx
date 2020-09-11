import React, { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

import getValidationError from '../../utils/getValidationError'
import api from '../../services/api'
import { APIErrorResponse } from '../../types'
import { useAuth } from '../../hooks'

import SimpleHeader from '../../components/SimpleHeader'
import SmallContainer from '../../components/SmallContainer'
import InputGroup from '../../components/InputGroup'
import SelectGroup from '../../components/SelectGroup'
import Button from '../../components/Button'

import './styles.scss'

interface ErrorMessage {
  name: string
  email: string
  password: string
  confirmPassword: string
  role: string
  global: string
}

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('user')
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({ name: '', email: '', password: '', confirmPassword: '', role: '', global: '' })

  const { logIn } = useAuth()

  const validateForm = async (): Promise<boolean> => {
    try {
      // schema to validate the user input
      const schema = Yup.object().shape({
        name: Yup.string().required('The name is required'),
        email: Yup.string().required('E-mail address is required').email('Type a valid e-mail address'),
        password: Yup.string().required('Password is required').min(8),
        confirmPassword: Yup.string().required('The confirm password is required').test('password-match', 'Passwords do not match', function (value) {
          const { password } = this.parent
          return password === value
        }),
        role: Yup.string().required('The user role is required').oneOf(['user', 'employeer'])
      })

      // validate the user input
      await schema.validate({ name, email, password, confirmPassword, role })

      return true
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationError = (getValidationError(error) as unknown) as ErrorMessage
        setErrorMessage({ ...validationError })
      }

      return false
    }
  }

  const handleForm = async (event: FormEvent) => {
    event.preventDefault()

    setErrorMessage({ name: '', email: '', password: '', confirmPassword: '', role: '', global: '' })

    if (!(await validateForm())) return false // stop the function

    api.post('/users', { name, email, password, confirmPassword, role })
      .then(async (result) => {
        await logIn(email, password)
      })
      .catch(error => {
        if (error.response && error.response.data.error_status_code !== 501) {
          const data: APIErrorResponse = error.response.data
          setErrorMessage({ ...errorMessage, global: data.error_message })
          return false
        } else {
          alert('Sorry, we have an internal server error :(')
          return false
        }
      })
  }

  const handleChange = (stateChange: CallableFunction) => {
    return (value: string) => {
      stateChange(value)
    }
  }

  return (
    <div className="signup">
      <SimpleHeader />

      <SmallContainer>
        <h1 className='title'>Sign up for a free account!</h1>

        <form onSubmit={handleForm}>
          { errorMessage.global !== '' ? (<p className='global-error'>{errorMessage.global}</p>) : null }

          <InputGroup
            type='text'
            id='name'
            label='Name'
            value={name}
            onChange={handleChange(setName)}
            required={true}
            placeholder='Type your full name'
            error={errorMessage.name}
          />

          <InputGroup
            type='email'
            id='email'
            label='Email'
            value={email}
            onChange={handleChange(setEmail)}
            required={true}
            placeholder='email@example.com'
            error={errorMessage.email}
          />

          <InputGroup
            type='password'
            id='password'
            label='Password'
            value={password}
            onChange={handleChange(setPassword)}
            required={true}
            placeholder='Type an password'
            error={errorMessage.password}
          />

          <InputGroup
            type='password'
            id='confirmPassword'
            label='Confirm Password'
            value={confirmPassword}
            onChange={handleChange(setConfirmPassword)}
            required={true}
            placeholder='Repeat your password'
            error={errorMessage.confirmPassword}
          />

          <SelectGroup
            id='role'
            label="I'm a"
            value={role}
            onChange={handleChange(setRole)}
            options={[
              { value: 'user', text: 'User' },
              { value: 'employeer', text: 'Employeer' }
            ]}
            required
            error={errorMessage.role}
          />

          <Button type='primary' content='Sign Up' isBlock={true} />
        </form>

        <p className="already-have-account">Already have an account? <Link to="login">Log In</Link></p>
      </SmallContainer>
    </div>
  )
}

export default SignUp
