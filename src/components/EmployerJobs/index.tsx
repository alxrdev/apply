import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Job, CollectionResponse } from '../../types'
import api from '../../services/api'

import Button from '../Button'
import JobItem from '../JobItem'

import './styles.scss'

interface Props {
  id: string
}

const EmployerJobs: React.FC<Props> = ({ id }) => {
  const [jobsResponse, setJobsResponse] = useState<Array<Job>>([])
  const history = useHistory()

  useEffect(() => {
    api.get(`/users/${id}/jobs`)
      .then(result => {
        const data = result.data as CollectionResponse<Job>
        setJobsResponse(data.data)
      })
      .catch(_ => {})
  }, [id])

  return (
    <div className="employer-jobs">
      <div className="top">
        <h1>My jobs</h1>
        <Button type='primary' content='Add new' onClick={() => history.push('/new-job')} />
      </div>

      <div className="jobs">
        { jobsResponse.map(job => (
          <JobItem key={job.id} job={job} />
        )) }
      </div>
    </div>
  )
}

export default EmployerJobs
