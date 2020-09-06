import React, { useEffect, useState, FormEvent } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { Job } from '../../types'
import api from '../../services/api'

import Header from '../../components/Header'
import SmallContainer from '../../components/SmallContainer'
import FileGroup from '../../components/FileGroup/Index'

import './styles.scss'
import Button from '../../components/Button'

const Apply: React.FC = () => {
  const { id } = useParams()
  const [job, setJob] = useState<Job>()
  const [resume, setResumse] = useState<File>()
  const history = useHistory()

  useEffect(() => {
    if (id) {
      console.log('searching..')
      api.get(`/jobs/${id}`)
        .then(response => {
          const data = response.data.data as Job
          setJob(data)
        })
        .catch(_ => history.push('/'))
    }
  }, [id])

  function handleForm (event: FormEvent) {
    event.preventDefault()

    console.log(resume)
  }

  return (
    <div className="apply-to-job">
      <Header />

      <div className="apply">
        { job && (
          <SmallContainer>
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
                    required={true}
                  />

                  <div className="button-section">
                    <Button type='primary' isBlock content='Apply' />
                  </div>
                </form>
              </div>
            </div>
          </SmallContainer>
        ) }
      </div>
    </div>
  )
}

export default Apply
