import React from 'react'

import JobItem from '../JobItem'

import { Job } from '../../types'

import './styles.scss'

interface Props {
  jobs: Array<Job>
}

const JobsList: React.FC<Props> = ({ jobs }) => (
  <div className="jobs-list">
    { jobs.map(job => (
      <JobItem key={job.id} job={job} />
    )) }
  </div>
)

export default JobsList
