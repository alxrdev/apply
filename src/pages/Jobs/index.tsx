import React, { useState, useEffect, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '../../hooks'

import api from '../../services/api'
import { CollectionResponse, Job } from '../../types'

import Header from '../../components/Header'
import SmallContainer from '../../components/SmallContainer'
import InputGroup from '../../components/InputGroup'
import Button from '../../components/Button'
import Dropdown from '../../components/Dropdown'
import JobsDirectory from '../../components/JobsDirectory'

import './styles.scss'

const Jobs = () => {
  const query = useQuery()

  const [what, setWhat] = useState(query.get('what') ?? '')
  const [where, setWhere] = useState(query.get('where') ?? '')
  const [sortBy, setSortBy] = useState(query.get('sortBy') ?? '')
  const [sortOrder, setSortOrder] = useState(query.get('sortOrder') ?? '')
  const [jobType, setJobType] = useState(query.get('jobType') ?? '')
  const [searching, setSearching] = useState(true)

  const [jobsResponse, setJobsResponse] = useState<CollectionResponse<Job>>()

  const history = useHistory()

  useEffect(() => {
    history.push(`/jobs?what=${what}&where=${where}&sortBy=${sortBy}&sortOrder=${sortOrder}&jobType=${jobType}`)
    api.get(`/jobs?what=${what}&where=${where}&sortBy=${sortBy}&sortOrder=${sortOrder}&jobType=${jobType}`)
      .then(result => {
        const data = result.data as CollectionResponse<Job>
        setJobsResponse(data)
        setSearching(false)
      })
      .catch(_ => {
        history.push('/')
        setSearching(false)
      })// eslint-disable-next-line
  }, [sortBy, sortOrder, jobType, searching, history]) 

  const handleForm = (event: FormEvent) => {
    event.preventDefault()
    setSearching(!searching)
  }

  const handleChange = (setChange: CallableFunction) => {
    return (value: string) => {
      setChange(value)
    }
  }

  return (
    <div className="jobs">
      <Header>
        <SmallContainer>
          <div className="search-jobs">
            <form onSubmit={handleForm}>
              <InputGroup
                type='search'
                id='what'
                label='What'
                placeholder='Job, key-word...'
                value={what}
                onChange={handleChange(setWhat)}
              />

              <InputGroup
                type='search'
                id='where'
                name='where'
                label='Where'
                placeholder='City, state...'
                value={where}
                onChange={handleChange(setWhere)}
              />

              <Button type='primary' content='Search' />
            </form>

            <div className="filters">
              <Dropdown
                label='Sort By'
                sections={[
                  {
                    id: 0,
                    borderTop: false,
                    borderBottom: false,
                    options: [
                      { value: 'createdAt', text: 'Date added' },
                      { value: 'salary', text: 'Salary' }
                    ]
                  }
                ]}
                callback={handleChange(setSortBy)}
              />

              <Dropdown
                label='Sort order'
                sections={[
                  {
                    id: 1,
                    borderTop: false,
                    borderBottom: false,
                    options: [
                      { value: 'asc', text: 'min - max' },
                      { value: 'desc', text: 'max - min' }
                    ]
                  }
                ]}
                callback={handleChange(setSortOrder)}
              />

              <Dropdown
                label='Job type'
                sections={[
                  {
                    id: 2,
                    borderTop: false,
                    borderBottom: false,
                    options: [
                      { value: 'full-time', text: 'Full-time' },
                      { value: 'part-time', text: 'Part-time' },
                      { value: 'contract', text: 'Contract' },
                      { value: 'internship', text: 'Internship' },
                      { value: 'freelancer', text: 'Freelancer' }
                    ]
                  }
                ]}
                callback={handleChange(setJobType)}
              />
            </div>
          </div>
        </SmallContainer>
      </Header>

      <SmallContainer>
        { jobsResponse && (<JobsDirectory jobsResponse={jobsResponse} />) }
      </SmallContainer>
    </div>
  )
}

export default Jobs
