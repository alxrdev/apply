import React, { useState, useEffect } from 'react'

import { User, CollectionResponse, Job } from '../../types'
import api from '../../services/api'

import JobItem from '../JobItem'

import './styles.scss'

interface Props {
  user: User
}

const JobsApplied: React.FC<Props> = ({ user }) => {
  const [jobsResponse, setJobsResponse] = useState<Array<Job>>([])

  useEffect(() => {
    api.get(`/users/${user.id}/jobs/applied`)
      .then(result => {
        const data = result.data as CollectionResponse<Job>
        setJobsResponse(data.data)
      })
      .catch(_ => {})
  }, [user])

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
