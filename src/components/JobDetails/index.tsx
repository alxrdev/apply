import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FiBriefcase, FiDollarSign } from 'react-icons/fi'

import { ActiveJobContext } from '../JobsDriectory/ActiveJobProvider'

import Button from '../Button'

import './styles.scss'

const JobDetails = () => {
  const { activeJob, setActiveJob } = useContext(ActiveJobContext)

  if (!activeJob) return (null)

  const { title, description, address, jobType, salary, createdAt } = activeJob
  const employeer = 'Apple inc.'

  const handleCancel = () => {
    setActiveJob(null)
  }

  return (
    <div className="job-details active">
      <div className="details">
        <div className="top">
          <div className="employeer-avatar">
            <img src="https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/53685cff8c94982b0b74b40fc78a4dcf" alt={title} />
          </div>
          <div className="title-employeer">
            <h5>{ title }</h5>
            <span><Link to='/'>{ employeer }</Link> <span>{ Intl.DateTimeFormat('pt-BR').format(new Date(createdAt)) }</span></span>
          </div>
        </div>

        <div className="description">
          <h5>Description</h5>
          <p>{ description }</p>
        </div>

        <div className="location">
          <h5>{ address.city }, { address.country }</h5>
          <span>
            <FiBriefcase size={15} />
            <span>{ jobType }</span>
          </span>
        </div>

        <div className="salary">
          <h5>{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(salary) }</h5>
          <span>
            <FiDollarSign size={15} />
            <span>Per Month</span>
          </span>
        </div>

        <div className="apply">
          <Button type='primary' isBlock={true} content='Apply Now' />
          <Button type='dark' isBlock={true} content='Cancel' onClick={handleCancel} />
        </div>
      </div>
    </div>
  )
}

export default JobDetails
