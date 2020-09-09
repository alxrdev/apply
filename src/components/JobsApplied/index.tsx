import React, { useState, useEffect } from 'react'

import { CollectionResponse, Job } from '../../types'
import api from '../../services/api'

import JobItem from '../JobItem'

import './styles.scss'

interface Props {
  id: string
}

const JobsApplied: React.FC<Props> = ({ id }) => {
  const [jobsResponse, setJobsResponse] = useState<Array<Job>>([])

  useEffect(() => {
    api.get(`/users/${id}/jobs/applied`)
      .then(result => {
        const data = result.data as CollectionResponse<Job>
        setJobsResponse(data.data)
      })
      .catch(_ => {})
  }, [id])

  return (
    <div className="jobs-applied">
      <h1>Jobs that I&apos;m applied</h1>

      <div className="jobs">
        { jobsResponse.map(job => (
          <JobItem key={job.id} job={job} />
        )) }
      </div>
    </div>
  )
}

export default JobsApplied
