import React from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../../services/auth'

import SimpleHeader from '../../components/SimpleHeader'
import SmallContainer from '../../components/SmallContainer'
import InputGroup from '../../components/InputGroup'
import Button from '../../components/Button'

import './styles.scss'

const Home = () => {
  const { user } = useAuth()

  return (
    <div className='home'>
      <SimpleHeader />

      <SmallContainer>
        <h1 className='title'>Find the job of your dreans</h1>

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
