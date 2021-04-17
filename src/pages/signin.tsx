import { FormEvent, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, Heading, Text } from '@chakra-ui/react'
import * as Yup from 'yup'

import InputGroup from '../components/form/InputGroup'
import { APIErrorResponse } from '../types'
import getValidationError from '../utils/getValidationError'
import CustomButton from '../components/ui/CustomButton'
import CustomLink from '../components/ui/CustomLink'
import SimpleHeader from '../components/header/SimpleHeader'
import { signIn } from 'next-auth/client'

interface ErrorMessage {
  email: string,
  password: string,
  global: string
}

export default function Login () {
  const router = useRouter()
  const redirectTo = (router.query.redirect) ? String(router.query.redirect) : '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({ email: '', password: '', global: '' })

  const validateForm = async (): Promise<boolean> => {
    try {
      // schema to validate the user input
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail address is required')
          .email('Type a valid e-mail address'),
        password: Yup.string()
          .required('Password is required')
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

    const hasError = await signIn('credentials', {
      email,
      password,
      callbackUrl: redirectTo,
      redirect: false
    }) as any

    // if user is success login and exists a redirect link,
    // then redirect to this link
    if (!hasError.error) {
      console.log('redirecting to', redirectTo)
      router.push(redirectTo)
    }

    if (hasError.error && String(hasError.error).startsWith('{')) {
      const data: APIErrorResponse = JSON.parse(hasError.error)
      if (data.error_status_code !== 501) {
        setErrorMessage({ email: '', password: '', global: data.error_message })
        return false
      }
    }

    if (hasError.error) {
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
    <Box>
      <Head>
        <title>Apply | Sign in to your account</title>
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
            Sign in to your account
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
              <InputGroup
                type='email'
                id='email'
                name='email'
                label='Email'
                value={email}
                onChange={handleChange(setEmail)}
                placeholder='example@example.com'
                error={errorMessage.email}
                isRequired
                groupMarginBottom="20px"
              />

              <InputGroup
                type='password'
                id='password'
                name='password'
                label='Password'
                value={password}
                onChange={handleChange(setPassword)}
                placeholder='Type your password'
                error={errorMessage.global || errorMessage.password}
                isRequired
              />

              <CustomLink
                href="/forgot-password"
                text="Forgot Password?"
                display="block"
                margin="1.3rem auto"
                textAlign="center"
                textDecoration="dashed"
                fontSize="md"
              />

              <CustomButton type="submit" buttonStyle='primary' isBlock={true} text='Sign in' marginTop="20px"/>
            </form>
          </Box>

          <Text
            marginTop="40px"
            color="brand.200"
            textAlign="center"
            fontSize="md"
          >
            Don&apos;t have an account? <CustomLink href="/signup" text="Sign up" />
          </Text>
        </Box>
    </Box>
  )
}
