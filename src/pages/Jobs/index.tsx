import React from 'react'

import Header from '../../components/Header'
import SearchJobs from '../../components/SearchJobs'
import Container from '../../components/Container'
import JobsDirectory from '../../components/JobsDriectory'

import './styles.scss'

const Jobs = () => (
  <div className="jobs">
    <Header>
      <SearchJobs />
    </Header>

    <Container>
      <JobsDirectory />
    </Container>
  </div>
)

export default Jobs
