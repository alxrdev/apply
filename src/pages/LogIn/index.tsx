import React, { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as Yup from 'yup'

import { useAuth, useQuery } from '../../hooks'
import { APIErrorResponse } from '../../types'
import getValidationError from '../../utils/getValidationError'

import SimpleHeader from '../../components/SimpleHeader'
import SmallContainer from '../../components/SmallContainer'
import InputGroup from '../../components/InputGroup'
import Button from '../../components/Button'

import './styles.scss'

interface ErrorMessage {
  email: string,
  password: string,
  global: string
}

const LogIn = () => {
  const { logIn } = useAuth()
  const redirect = useQuery().get('redirect') ?? undefined
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({ email: '', password: '', global: '' })

  const validateForm = async (): Promise<boolean> => {
    try {
      // schema to validate the user input
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail address is required').email('Type a valid e-mail address'),
        password: Yup.string().required('Password is required')
      })

      // validate the user input
      await schema.validate({ email, password })

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

    setErrorMessage({ email: '', password: '', global: '' })

    if (!(await validateForm())) return false // stop the function

    const result = await logIn(email, password)

    // if user is success login and exists a redirect link,
    // then redirect to this link
    if (!result && redirect) {
      console.log('redirecting to', redirect)
      history.push(redirect)
    }

    if (result && result.error_status_code !== 501) {
      const data: APIErrorResponse = result
      setErrorMessage({ ...errorMessage, global: data.error_message })
      return false
    }

    if (result) {
      alert('Sorry, we have an internal server error :(')
      return false
    }
  }

  const handleChange = (stateChange: CallableFunction) => {
    return (value: string) => {
      stateChange(value)
    }
  }

  return (
    <div className="login">
      <SimpleHeader />

      <SmallContainer>
        <h1 className='title'>Log In</h1>

        <form onSubmit={handleForm}>
          <InputGroup
            type='email'
            id='email'
            name='email'
            label='Email'
            value={email}
            onChange={handleChange(setEmail)}
            placeholder='example@example.com'
            error={errorMessage.email}
            required
          />

          <InputGroup
            type='password'
            id='password'
            name='password'
            label='Password'
            value={password}
            onChange={handleChange(setPassword)}
            placeholder='your password'
            error={errorMessage.password + errorMessage.global}
            required
          />

          <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>

          <Button type='primary' isBlock={true} content='Log In' />
        </form>

        <p className="dont-have-account">Don&apos;t have an account? <Link to="/signup">Sign up</Link></p>
      </SmallContainer>
    </div>
  )
}

export default LogIn
