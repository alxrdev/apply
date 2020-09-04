import React, { useState, useEffect } from 'react'

import { Job } from '../../types'
import { ActiveJobProvider } from './ActiveJobProvider'

import JobsList from '../JobsList'
import JobDetails from '../JobDetails'

import './styles.scss'

const JobsDirectory = () => {
  const [jobs, setJobs] = useState<Array<Job>>([])

  useEffect(() => {
    setJobs([{
      id: 'asdfwefsdfasdf',
      employeer: 'Apple Inc.',
      title: 'Desenvolvedor(a) BPM / Pleno / Senior',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident tempora itaque quia labore consequuntur ad aperiam esse doloremque similique fuga iure neque quo, adipisci nihil, velit reprehenderit eum repellat temporibus?',
      address: { country: 'BRA', city: 'São Mateus', state: 'Espírito Santo' },
      jobType: 'Full-Time',
      salary: 3600.00
    },
    {
      id: 'wersdfwasdfwerasdf',
      employeer: 'PicPay.',
      title: 'Desenvolvedor(a) PHP Pleno',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident tempora itaque quia labore consequuntur ad aperiam esse doloremque similique fuga iure neque quo, adipisci nihil, velit reprehenderit eum repellat temporibus?',
      address: { country: 'BRA', city: 'Vitória', state: 'Espírito Santo' },
      jobType: 'Full-Time',
      salary: 3600.00
    }])
  }, [])

  return (
    <ActiveJobProvider>
      <div className="jobs-directory">
        <div className="all-jobs">
          <p>All jobs</p>
          <JobsList jobs={jobs} />
        </div>
        <JobDetails />
      </div>
    </ActiveJobProvider>
  )
}

export default JobsDirectory
