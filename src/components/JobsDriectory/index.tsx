import React from 'react'

import { Job, CollectionResponse } from '../../types'

import JobItem from '../JobItem'

import './styles.scss'

interface Props {
  jobsResponse: CollectionResponse<Job>
}

const JobsDirectory: React.FC<Props> = ({ jobsResponse }) => {
  return (
    <div className="jobs-directory">
      <div className="all-jobs">
        <p className='total-jobs'>Total jobs found: {jobsResponse.totalItems}</p>
        { jobsResponse.data.map(job => (
          <JobItem key={job.id} job={job} />
        )) }
      </div>
    </div>
  )
}

export default JobsDirectory
