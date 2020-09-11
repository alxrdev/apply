import React, { FormEvent, useState, useEffect } from 'react'
import * as Yup from 'yup'
import swal from 'sweetalert'

import { useAuth } from '../../hooks'
import api from '../../services/api'
import { User } from '../../types'
import getValidationError from '../../utils/getValidationError'
import getApiValidationError from '../../utils/getApiValidationError'

import InputGroup from '../../components/InputGroup'
import Button from '../../components/Button'

import './styles.scss'

interface ErrorMessage {
  name: string
  headline: string
  address: string
  bio: string
}

const UpdateProfile: React.FC = () => {
  const { user } = useAuth()

  const [name, setName] = useState('')
  const [headline, setHeadline] = useState('')
  const [address, setAddress] = useState('')
  const [bio, setBio] = useState('')
  const [errors, setErrors] = useState({ name: '', headline: '', address: '', bio: '' })

  useEffect(() => {
    if (user) {
      api.get(`/users/${user.id}`)
        .then(result => {
          const data = result.data.data as User
          setName(data.name)
          setHeadline(data.headline)
          setAddress(data.address)
          setBio(data.bio)
        })
        .catch(_ => console.log('error on load user'))
    }
  }, [user])

  async function validateForm () {
    try {
      // schema to validate the user input
      const schema = Yup.object().shape({
        name: Yup.string().required('The name is required'),
        headline: Yup.string().max(30),
        address: Yup.string().max(30),
        bio: Yup.string().max(80)
      })

      // validate the user input
      await schema.validate({ name, headline, address, bio })

      return true
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationError = (getValidationError(error) as unknown) as ErrorMessage
        setErrors({ ...validationError })
      }

      return false
    }
  }

  async function handleForm (event: FormEvent) {
    event.preventDefault()

    setErrors({ name: '', headline: '', address: '', bio: '' })

    if (!(await validateForm())) return false

    try {
      await api.put(`/users/${user!.id}`, {
        name,
        headline,
        address,
        bio
      })

      swal({
        text: 'Profile successfully updated.',
        icon: 'success',
        className: 'profile-modal'
      })
    } catch (error) {
      if (error.response && error.response.data.error_status_code !== 501) {
        const response = getApiValidationError(error.response.data)
        setErrors({ ...errors, ...response })

        swal({
          text: response.globalError,
          icon: 'error',
          className: 'profile-modal'
        })

        return false
      } else {
        swal({
          text: 'Sorry, we have an internal server error :(',
          icon: 'error',
          className: 'profile-modal'
        })
        return false
      }
    }
  }

  const handleChange = (setChange: CallableFunction) => {
    return (value: string) => setChange(value)
  }

  return (
    <form onSubmit={handleForm}>
      <InputGroup
        id='name'
        label='Name'
        value={name}
        onChange={handleChange(setName)}
        required
        error={errors.name}
      />

      <InputGroup
        id='headline'
        label='Headline'
        value={headline}
        onChange={handleChange(setHeadline)}
        required
        error={errors.headline}
        placeholder='Full Stack Developer'
      />

      <InputGroup
        id='address'
        label='Address'
        value={address}
        onChange={handleChange(setAddress)}
        required
        error={errors.address}
        placeholder='Vitória, ES'
      />

      <InputGroup
        id='bio'
        label='Bio'
        value={bio}
        onChange={handleChange(setBio)}
        required
        error={errors.bio}
        placeholder='I am Full Stack Developer...'
      />

      <Button type='primary' content='Update Profile' />
    </form>
  )
}

export default UpdateProfile
