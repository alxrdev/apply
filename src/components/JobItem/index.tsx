import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { MdPublic, MdQueryBuilder } from 'react-icons/md'

import { Job } from '../../types'

import './styles.scss'

interface Props {
  job: Job
}

const JobItem: React.FC<Props> = ({ job }) => {
  const history = useHistory()

  return (
    <div
      className="job-item"
      onClick={() => history.push(`/job/${job.id}`)}
    >
      <div className="avatar">
        <img src={ job.user.avatar } alt={job.title} />
      </div>

      <div className="job-content">
        <div className="employer-title">
          <Link to={`/user/${job.user.id}`} className="employer">{ job.user.name }</Link>

          <h5 className="title">{ job.title }</h5>
        </div>

        <div className="type-location-date">
          <div>
            <span className="type">{ job.jobType }</span>
          </div>

          <div className="location-date">
            <div className="location">
              <MdPublic size={18} />
              <span>{ job.address.city }, { job.address.state }</span>
            </div>

            <div className="date">
              <MdQueryBuilder size={18} />
              <span>{ Intl.DateTimeFormat('pt-BR').format(new Date(job.createdAt)) }</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobItem
