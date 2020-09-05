import React from 'react'

import { Job, CollectionResponse } from '../../types'
import { ActiveJobProvider } from './ActiveJobProvider'

import JobsList from '../JobsList'
import JobDetails from '../JobDetails'

import './styles.scss'

interface Props {
  jobsResponse: CollectionResponse<Job>
}

const JobsDirectory: React.FC<Props> = ({ jobsResponse }) => {
  return (
    <ActiveJobProvider>
      <div className="jobs-directory">
        <div className="all-jobs">
          <p className='total-jobs'>Total jobs found: {jobsResponse.totalItems}</p>
          <JobsList jobs={jobsResponse.data} />
        </div>
        <JobDetails />
      </div>
    </ActiveJobProvider>
  )
}

export default JobsDirectory
