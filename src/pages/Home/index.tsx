import React, { useState, FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { useAuth } from '../../services/auth'

import Header from '../../components/Header'
import SmallContainer from '../../components/SmallContainer'
import InputGroup from '../../components/InputGroup'
import Button from '../../components/Button'

import './styles.scss'

const Home = () => {
  const { user } = useAuth()

  const [what, setWhat] = useState('')
  const [where, setWhere] = useState('')

  const history = useHistory()

  const handleForm = (event: FormEvent) => {
    event.preventDefault()

    if (what === '') {
      alert('Please, type a job title.')
    } else {
      history.push(`/jobs?what=${what}&where=${where}`)
    }
  }

  const handleChange = (stateChange: CallableFunction) => {
    return (value: string) => {
      stateChange(value)
    }
  }

  return (
    <div className='home'>
      <Header />

      <SmallContainer>
        <h1 className='title'>Find the job of your dreans</h1>

        <form onSubmit={handleForm}>
          <InputGroup
            type='search'
            id='what'
            name='what'
            label='What'
            value={what}
            onChange={handleChange(setWhat)}
            placeholder='Job, employeer, key-word...'
          />

          <InputGroup
            type='search'
            id='where'
            name='where'
            label='Where'
            value={where}
            onChange={handleChange(setWhere)}
            placeholder='Country, state, city...'
          />

          <Button type='primary' isBlock={true} content='Search a Job' />
        </form>

        { !user && (
          <div className='actions'>
            <p className='looking-for-a-job'>Are you looking for a job? Apply for one. <Link to='/login'>Log In</Link></p>
            <p className='are-you-employeer'>Are you an employeer? Advertise your job here. <Link to='/signup'>Sign up</Link></p>
          </div>
        ) }
      </SmallContainer>
    </div>
  )
}

export default Home
