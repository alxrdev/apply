import React, { useEffect, useState } from 'react'

import { Job, CollectionResponse } from '../../types'
import api from '../../services/api'

import JobItem from '../JobItem'

import './styles.scss'
import Button from '../Button'

interface Props {
  id: string
}

const EmployeerJobs: React.FC<Props> = ({ id }) => {
  const [jobsResponse, setJobsResponse] = useState<Array<Job>>([])

  useEffect(() => {
    api.get(`/users/${id}/jobs`)
      .then(result => {
        const data = result.data as CollectionResponse<Job>
        setJobsResponse(data.data)
      })
      .catch(_ => {})
  }, [id])

  return (
    <div className="employeer-jobs">
      <div className="top">
        <h1>My jobs</h1>
        <Button type='primary' content='Add new' />
      </div>

      <div className="jobs">
        { jobsResponse.map(job => (
          <JobItem key={job.id} job={job} />
        )) }
      </div>
    </div>
  )
}

export default EmployeerJobs
