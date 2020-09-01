import React from 'react'

import JobsList from '../JobsList'
import JobDetails from '../JobDetails'

import { Job } from '../../types'
import { ActiveJobContext } from './ActiveJobContext'

import './styles.scss'

interface Props {}

interface State {
  jobs: Array<Job>
  activeJob: Job | null
}

class JobsDirectory extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      jobs: [{
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
      }],
      activeJob: null
    }
  }

  setActiveJob = (job: Job | null) => {
    this.setState({ activeJob: job })
  }

  render () {
    return (
      <div className="jobs-directory">
        <div className="all-jobs">
          <p>All jobs</p>

          <ActiveJobContext.Provider value={{
            activeJob: this.state.activeJob,
            setActiveJob: this.setActiveJob
          }}>
            <JobsList jobs={this.state.jobs} />
          </ActiveJobContext.Provider>
        </div>

        { this.state.activeJob && (
          <ActiveJobContext.Provider value={{
            activeJob: this.state.activeJob,
            setActiveJob: this.setActiveJob
          }}>
            <JobDetails />
          </ActiveJobContext.Provider>
        ) }
      </div>
    )
  }
}

export default JobsDirectory
