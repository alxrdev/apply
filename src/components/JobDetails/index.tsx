import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiBriefcase, FiDollarSign } from 'react-icons/fi'

import { ActiveJobContext } from '../JobsDriectory/ActiveJobProvider'

import Button from '../Button'

import './styles.scss'

const JobDetails = () => {
  const { activeJob, setActiveJob } = useContext(ActiveJobContext)
  const history = useHistory()

  if (!activeJob) return (null)

  const handleApply = () => {
    history.push(`/apply/${activeJob.id}`)
  }

  const handleCancel = () => {
    setActiveJob(null)
  }

  return (
    <div className="job-details active">
      <div className="details">
        <div className="top">
          <div className="employeer-avatar">
            <img src={activeJob.user.avatar} alt={activeJob.title} />
          </div>
          <div className="title-employeer">
            <h5>{ activeJob.title }</h5>
            <span><Link to='/'>{ activeJob.user.name }</Link> <span>{ Intl.DateTimeFormat('pt-BR').format(new Date(activeJob.createdAt)) }</span></span>
          </div>
        </div>

        <div className="description">
          <h5>Description</h5>
          <p>{ activeJob.description }</p>
        </div>

        <div className="location">
          <h5>{ activeJob.address.city }, { activeJob.address.state }</h5>
          <span>
            <FiBriefcase size={15} />
            <span>{ activeJob.jobType }</span>
          </span>
        </div>

        <div className="salary">
          <h5>{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(activeJob.salary) }</h5>
          <span>
            <FiDollarSign size={15} />
            <span>Per Month</span>
          </span>
        </div>

        <div className="apply">
          <Button type='primary' isBlock={true} content='Apply Now' onClick={handleApply} />
          <Button type='dark' isBlock={true} content='Cancel' onClick={handleCancel} />
        </div>
      </div>
    </div>
  )
}

export default JobDetails
