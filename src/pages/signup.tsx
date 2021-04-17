import Head from 'next/head'
import { signIn } from 'next-auth/client'
import { FormEvent, useState } from 'react'
import { Alert, AlertIcon, Box, Heading, Stack, Text } from '@chakra-ui/react'
import * as Yup from 'yup'

import api from '../services/api'

import InputGroup from '../components/form/InputGroup'
import { APIErrorResponse } from '../types'
import getValidationError from '../utils/getValidationError'
import CustomButton from '../components/ui/CustomButton'
import CustomLink from '../components/ui/CustomLink'
import SimpleHeader from '../components/header/SimpleHeader'
import SelectGroup from '../components/form/SelectGroup'

interface ErrorMessage {
  name: string
  email: string
  password: string
  confirmPassword: string
  role: string
  global: string
}

export default function SignUp () {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('user')
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({ name: '', email: '', password: '', confirmPassword: '', role: '', global: '' })

  const validateForm = async (): Promise<boolean> => {
    try {
      // schema to validate the user input
      const schema = Yup.object().shape({
        name: Yup.string()
          .required('The name is required'),
        email: Yup.string()
          .required('E-mail address is required')
          .email('Type a valid e-mail address'),
        password: Yup.string()
          .required('Password is required')
          .min(8),
        confirmPassword: Yup.string()
          .required('The confirm password is required')
          .test('password-match', 'Passwords do not match', function (value) {
            const { password } = this.parent
            return password === value
          }),
        role: Yup.string()
          .required('The user role is required')
          .oneOf(['user', 'employer'])
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

    try {
      await api.post('/users', { name, email, password, confirmPassword, role })
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/'
      })
    } catch (error) {
      if (error.response && error.response.data.error_status_code !== 501) {
        const data: APIErrorResponse = error.response.data
        setErrorMessage({ ...errorMessage, global: data.error_message })
        return false
      } else {
        alert('Sorry, we have an internal server error :(')
        return false
      }
    }
  }

  const handleChange = (stateChange: CallableFunction) => {
    return (value: string) => {
      stateChange(value)
    }
  }

  return (
    <Box>
      <Head>
        <title>Apply | Sign up for a free account!</title>
      </Head>

      <SimpleHeader />

      <Box
        width="100%"
        maxWidth="700px"
        padding="0 1.8rem 1.8rem 1.8rem"
        margin="0 auto">
          <Heading
            as="h1"
            textAlign="center"
            fontSize="3xl"
            margin="20px 0 30px 0"
          >
            Sign up for a free account!
          </Heading>

          <Box
            maxWidth="500px"
            margin="0 auto"
            bg="white"
            py="8"
            px={{ base: '4', md: '10' }}
            shadow="base"
            rounded={{ sm: 'lg' }}
          >
            <form onSubmit={handleForm}>
              { errorMessage.global && (
                <Stack marginBottom="20px" fontSize="sm">
                  <Alert status="error">
                    <AlertIcon />
                    {errorMessage.global}
                  </Alert>
                </Stack>
              ) }

              <InputGroup
                type='text'
                id='name'
                label='Name'
                value={name}
                onChange={handleChange(setName)}
                isRequired
                placeholder='Type your full name'
                error={errorMessage.name}
                groupMarginBottom="20px"
              />

              <InputGroup
                type='email'
                id='email'
                label='Email'
                value={email}
                onChange={handleChange(setEmail)}
                isRequired
                placeholder='email@example.com'
                error={errorMessage.email}
                groupMarginBottom="20px"
              />

              <InputGroup
                type='password'
                id='password'
                label='Password'
                value={password}
                onChange={handleChange(setPassword)}
                isRequired
                placeholder='Type an password'
                error={errorMessage.password}
                groupMarginBottom="20px"
              />

              <InputGroup
                type='password'
                id='confirmPassword'
                label='Confirm Password'
                value={confirmPassword}
                onChange={handleChange(setConfirmPassword)}
                isRequired
                placeholder='Repeat your password'
                error={errorMessage.confirmPassword}
                groupMarginBottom="20px"
              />

              <SelectGroup
                id='role'
                label="I'm a"
                value={role}
                onChange={handleChange(setRole)}
                options={[
                  { value: 'user', text: 'User' },
                  { value: 'employer', text: 'Employer' }
                ]}
                isRequired
                error={errorMessage.role}
              />

              <CustomButton
                buttonStyle='primary'
                isBlock={true}
                text='Sign up'
                marginTop="20px"
                type="submit"
              />
            </form>
          </Box>

          <Text
            marginTop="40px"
            color="brand.200"
            textAlign="center"
            fontSize="md"
          >
            Already have an account? <CustomLink href="/signin" text="Sign in" />
          </Text>
        </Box>
    </Box>
  )
}
