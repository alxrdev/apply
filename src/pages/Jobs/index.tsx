import React, { useState, useEffect, FormEvent, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '../../hooks'

import api from '../../services/api'
import { CollectionResponse, Job } from '../../types'
import JobsListContext from '../../providers/JobsList/JobsListContext'

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

  const { jobs, setJobs, isSearching, setIsSearching } = useContext(JobsListContext)

  const history = useHistory()

  useEffect(() => {
    if (isSearching || jobs == null) {
      // history.push(`/jobs?what=${what}&where=${where}&sortBy=${sortBy}&sortOrder=${sortOrder}&jobType=${jobType}`)
      api.get(`/jobs?what=${what}&where=${where}&sortBy=${sortBy}&sortOrder=${sortOrder}&jobType=${jobType}`)
      .then(result => {
        const data = result.data as CollectionResponse<Job>
        setJobs(data)
        setIsSearching(false)
      })
      .catch(_ => {
        history.push('/')
        setIsSearching(false)
      })
    }
    // eslint-disable-next-line
  }, [sortBy, sortOrder, jobType, isSearching, history]) 

  const handleForm = (event: FormEvent) => {
    event.preventDefault()
    setIsSearching(true)
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
                callback={handleChange((value: string) => {
                  setSortBy(value)
                  setIsSearching(true)
                })}
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
                callback={handleChange((value: string) => {
                  setSortOrder(value)
                  setIsSearching(true)
                })}
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
                callback={handleChange((value: string) => {
                  setJobType(value)
                  setIsSearching(true)
                })}
              />
            </div>
          </div>
        </SmallContainer>
      </Header>

      <SmallContainer>
        { jobs && (<JobsDirectory jobsResponse={jobs} />) }
      </SmallContainer>
    </div>
  )
}

export default Jobs
