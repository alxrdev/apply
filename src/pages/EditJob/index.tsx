import React, { useEffect, useState, FormEvent } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import swal from 'sweetalert'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import { useAuth } from '../../hooks'
import { Job, APIErrorResponse } from '../../types'
import api from '../../services/api'
import getValidationError from '../../utils/getValidationError'
import getApiValidationError from '../../utils/getApiValidationError'

import Header from '../../components/Header'
import Container from '../../components/Container'
import BackButton from '../../components/BackButton'
import InputGroup from '../../components/InputGroup'
import SelectGroup from '../../components/SelectGroup'
import Button from '../../components/Button'

import './styles.scss'

interface ErrorMessage {
  globalError: string
  title: string
  description: string
  city: string
  state: string
  jobType: string
  salary: string
}

const EditJob: React.FC = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const history = useHistory()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [jobType, setJobType] = useState('Full-time')
  const [salary, setSalary] = useState<number>(100.00)

  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({ globalError: '', title: '', description: '', city: '', state: '', jobType: '', salary: '' })

  useEffect(() => {
    if (id && user) {
      api.get(`/jobs/${id}`)
        .then(result => {
          const data = result.data.data as Job
          if (data.user.id === user.id) {
            setTitle(data.title)
            setDescription(data.description)
            setCity(data.address.city)
            setState(data.address.state)
            setJobType(data.jobType)
            setSalary(data.salary)
          } else {
            history.push('/')
          }
        })
        .catch(_ => history.push('/'))
    }
  }, [id, user])

  const validateForm = async (): Promise<boolean> => {
    try {
      // schema to validate the user input
      const schema = Yup.object().shape({
        title: Yup.string()
          .required('The job title is required'),
        description: Yup.string()
          .required('A description is required'),
        city: Yup.string()
          .required('The city address is required')
          .transform(function (value, originalvalue) {
            return this.isType(value) && value !== null ? value.toUpperCase() : value
          }),
        state: Yup.string()
          .required('The state address is required')
          .length(2)
          .transform(function (value, originalvalue) {
            return this.isType(value) && value !== null ? value.toUpperCase() : value
          }),
        jobType: Yup.string()
          .required('The job type is required')
          .oneOf(['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelancer']),
        salary: Yup.number()
          .required('The job salary is required')
          .min(100)
      })

      // validate the user input
      await schema.validate({ title, description, city, state, jobType, salary })

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

    setErrorMessage({ globalError: '', title: '', description: '', city: '', state: '', jobType: '', salary: '' })

    if (!(await validateForm())) return false // stop the function

    api.put(`/jobs/${id}`, { title, description, city, state, jobType, salary: Number(salary) })
      .then(async (result) => {
        swal({
          text: 'Job has been sucessfully updated.',
          icon: 'success',
          className: 'job-updated-modal'
        })
          .then(_ => {
            history.push(`/job/${id}`)
          })
      })
      .catch(error => {
        if (error.response && error.response.data.error_status_code !== 501) {
          const data: APIErrorResponse = error.response.data
          const response = getApiValidationError(data)
          console.log(response)
          setErrorMessage({ ...errorMessage, ...response })
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
    <div className="edit-job">
      <Header />

      <Container>
        <div className="actions">
          <BackButton text='Back' />
        </div>

        <div className="edit-job-content">
          <h1>Add a New Job</h1>

          <form onSubmit={handleForm}>
            { errorMessage.globalError !== '' ? (<p className='global-error'>{errorMessage.globalError}</p>) : null }

            <InputGroup
              type='text'
              id='title'
              label='Title'
              value={title}
              onChange={handleChange(setTitle)}
              required={true}
              placeholder='Type the job title'
              error={errorMessage.title}
            />

            <div className='description'>
              <label>Description</label>
              <CKEditor
                editor={ClassicEditor}
                data={description}
                onChange={(_: any, editor: any) => {
                  const data = editor.getData()
                  setDescription(data)
                }}
                config={{
                  toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote']
                }}
              />
            </div>

            <div className="input-columns">
              <InputGroup
                type='text'
                id='city'
                label='City'
                value={city}
                onChange={handleChange(setCity)}
                required={true}
                placeholder='City'
                error={errorMessage.city}
              />

              <InputGroup
                type='text'
                id='state'
                label='State'
                value={state}
                onChange={handleChange(setState)}
                required={true}
                placeholder='State ex: NY'
                maxLength={2}
                error={errorMessage.state}
              />
            </div>

            <div className="input-columns">
              <SelectGroup
                id='jobType'
                label='Job Type'
                value={jobType}
                onChange={handleChange(setJobType)}
                options={[
                  { value: 'Full-time', text: 'Full-time' },
                  { value: 'Part-time', text: 'Part-time' },
                  { value: 'Contract', text: 'Contract' },
                  { value: 'Internship', text: 'Internship' },
                  { value: 'Freelancer', text: 'Freelancer' }
                ]}
                error={errorMessage.jobType}
              />

              <InputGroup
                type='number'
                id='salary'
                label='Salary'
                value={salary}
                onChange={handleChange(setSalary)}
                required={true}
                placeholder='Salary'
                error={errorMessage.salary}
              />
            </div>

            <Button type='primary' content='Update' isBlock />
          </form>
        </div>
      </Container>
    </div>
  )
}

export default EditJob
