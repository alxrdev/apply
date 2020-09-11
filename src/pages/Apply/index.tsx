import React, { useEffect, useState, FormEvent } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import swal from 'sweetalert'

import { Job, APIErrorResponse } from '../../types'
import api from '../../services/api'
import { useAuth } from '../../hooks'

import Header from '../../components/Header'
import Container from '../../components/Container'
import FileGroup from '../../components/FileGroup/Index'
import Button from '../../components/Button'
import BackButton from '../../components/BackButton'

import './styles.scss'

const Apply: React.FC = () => {
  const { id } = useParams()
  const { user } = useAuth()

  const [job, setJob] = useState<Job>()

  const [resume, setResumse] = useState<File>()
  const [error, setError] = useState('')

  const history = useHistory()

  useEffect(() => {
    if (id && user) {
      api.get(`/jobs/${id}`)
        .then(response => {
          const data = response.data.data as Job
          setJob(data)
        })
        .catch(_ => history.push('/'))

      api.get(`/jobs/${id}/users/${user.id}`)
        .then(_ => history.push('/'))
        .catch(_ => {})
    }
  }, [user, id])

  function handleForm (event: FormEvent) {
    event.preventDefault()

    setError('')

    if (!resume) {
      setError('The resume file is required.')
      return false
    }

    const data = new FormData()
    data.append('resume', resume)

    api.post(
      `/jobs/${job!.id}/apply`, data,
      { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(res => {
        swal({
          title: 'Your Application has been sucessfully submitted.',
          text: 'Your application will be sent to the following company.',
          icon: 'success',
          className: 'apply-modal'
        })
          .then(_ => {
            history.push('/')
          })
      })
      .catch(error => {
        const data = error.response.data as APIErrorResponse
        if (data.error_status_code === 400) {
          swal({
            title: 'Ops!',
            text: (data.error_details) ? data.error_details[0].constraints : data.error_message,
            icon: 'error',
            className: 'apply-modal'
          })
          setError((data.error_details) ? data.error_details[0].constraints : data.error_message)
        } else {
          swal({
            title: 'Ops!',
            text: 'We have a internal server error.',
            icon: 'error',
            className: 'apply-modal'
          })
        }
      })
  }

  return (
    <div className="apply-to-job">
      <Header />

      <div className="apply">
        <Container>
          <div className="actions">
            <BackButton text='Back to job' />
          </div>

          { job && (
            <div className="apply-content">
              <div className="job-info">
                <div className="employeer-avatar">
                  <img src={job.user.avatar} alt={job.title} />
                </div>
                <div className="title-employeer">
                  <h5>{ job.title }</h5>
                  <span className="employeer">{ job.user.name }</span>
                  <span className="location">{ job.address.city }, { job.address.state }</span>
                </div>
              </div>

              <div className="apply-box">
                <h2>Select a resume file and apply to this job</h2>
                <form onSubmit={handleForm}>
                  <FileGroup
                    id='resume'
                    label='Choose a resume'
                    onChange={setResumse}
                    error={error}
                  />

                  <div className="button-section">
                    <Button type='primary' isBlock content='Apply' />
                  </div>
                </form>
              </div>
            </div>
          ) }
        </Container>
      </div>
    </div>
  )
}

export default Apply
