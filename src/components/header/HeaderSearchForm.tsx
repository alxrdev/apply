import { Box, Container, Grid } from '@chakra-ui/layout'
import { useState } from 'react'

import CustomButton from '../ui/CustomButton'
import Dropdown from '../ui/Dropdown'
import InputGroup from '../form/InputGroup'

export default function HeaderSearchForm () {
  const [what, setWhat] = useState('')
  const [where, setWhere] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [sortOrder, setSortOrder] = useState('')
  const [jobType, setJobType] = useState('')

  const handleChange = (setChange: CallableFunction) => {
    return (value: string) => {
      setChange(value)
    }
  }

  return (
    <Container
      maxWidth="container.md"
      margin="0 auto"
      padding={{ base: '.3rem 0', lg: '.3rem 1.6rem' }}
    >
      <form action="#">
        <Grid
          gridTemplateColumns={{ base: '1fr', lg: '2fr 2fr 1fr' }}
          gridTemplateRows={{ base: '1fr 1fr', lg: '1fr' }}
          gridGap={{ lg: '10px' }}
          alignItems="end"
          marginBottom="15px"
        >
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

          <CustomButton buttonStyle='primary' text='Search' marginBottom={{ lg: '10px' }} padding="1rem" />
        </Grid>
      </form>

      <Box marginBottom="10px">
        <Dropdown
          text={(sortOrder === '') ? 'Sort By' : sortOrder}
          options={[
            { value: 'createdAt', text: 'Date added' },
            { value: 'salary', text: 'Salary' }
          ]}
          onClick={handleChange((value: string) => {
            setSortBy(value)
          })}
          margin="0 10px 0 0"
        />

        <Dropdown
          text={(sortBy === '') ? 'Sort Order' : sortBy}
          options={[
            { value: 'asc', text: 'Min - Max' },
            { value: 'desc', text: 'Max - Min' }
          ]}
          onClick={handleChange((value: string) => {
            setSortOrder(value)
          })}
          margin="0 10px 0 0"
        />

        <Dropdown
          text={(jobType === '') ? 'Job Type' : jobType}
          options={[
            { value: 'full-time', text: 'Full-time' },
            { value: 'part-time', text: 'Part-time' },
            { value: 'contract', text: 'Contract' },
            { value: 'internship', text: 'Internship' },
            { value: 'freelancer', text: 'Freelancer' }
          ]}
          onClick={handleChange((value: string) => {
            setJobType(value)
          })}
        />
      </Box>
    </Container>
  )
}
