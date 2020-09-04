import React from 'react'

import Container from '../Container'
import InputGroup from '../InputGroup'
import Button from '../Button'
import Dropdown from '../Dropdown'

import './styles.scss'

class SearchJobs extends React.Component {
  render () {
    return (
      <Container>
        <div className="search-jobs">
          <form>
            <InputGroup
              type='search'
              id='what'
              name='what'
              label='What'
              placeholder='Job, employeer, key-word...'
              value=''
            />

            <InputGroup
              type='search'
              id='where'
              name='where'
              label='Where'
              placeholder='Country, state, city...'
              value=''
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
            />
          </div>
        </div>
      </Container>
    )
  }
}

export default SearchJobs
