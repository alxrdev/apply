import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

import InputGroup from '../form/InputGroup'
import CustomButton from '../ui/CustomButton'

import { Box, Grid } from '@chakra-ui/react'

export default function HomeSearchForm () {
  const [what, setWhat] = useState('')
  const [where, setWhere] = useState('')

  const router = useRouter()

  const handleForm = (event: FormEvent) => {
    event.preventDefault()

    if (what === '') {
      alert('Please, type a job title.')
    } else {
      router.push(`/jobs?what=${what}&where=${where}`)
    }
  }

  const handleChange = (stateChange: CallableFunction) => {
    return (value: string) => {
      stateChange(value)
    }
  }

  return (
    <Box margin="50px 0">
      <form onSubmit={handleForm}>
        <Grid
          gridTemplateColumns={{ base: '1fr', lg: '1fr 1fr' }}
          gridTemplateRows={{ base: '1fr 1fr', lg: '1fr' }}
          gridGap={{ lg: '10px' }}
          marginBottom="15px"
        >
          <InputGroup
            type='search'
            id='what'
            name='what'
            label='What'
            value={what}
            onChange={handleChange(setWhat)}
            placeholder='Job, key-word...'
          />

          <InputGroup
            type='search'
            id='where'
            name='where'
            label='Where'
            value={where}
            onChange={handleChange(setWhere)}
            placeholder='City, state...'
          />
        </Grid>

        <CustomButton buttonStyle='primary' type="submit" isBlock={true} text='Search a Job' />
      </form>
    </Box>
  )
}
