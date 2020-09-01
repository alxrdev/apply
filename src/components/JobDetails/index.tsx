import React from 'react'
import { Link } from 'react-router-dom'
import { FiBriefcase, FiDollarSign } from 'react-icons/fi'

import Button from '../Button'

import { ActiveJobContext } from '../JobsDriectory/ActiveJobContext'

import './styles.scss'

interface Props {}

class JobDetails extends React.Component<Props> {
  render () {
    const { title, employeer, description, address, jobType, salary } = this.context.activeJob

    return (
      <div className="job-details active">
        <div className="details">
          <div className="top">
            <div className="employeer-avatar">
              <img src="https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/53685cff8c94982b0b74b40fc78a4dcf" alt={title} />
            </div>
            <div className="title-employeer">
              <h5>{ title }</h5>
              <span><Link to='/'>{ employeer }</Link> <span>14 days ago</span></span>
            </div>
          </div>

          <div className="description">
            <h5>Description</h5>
            <p>{ description }</p>
          </div>

          <div className="location">
            <h5>{ address.city }, { address.state }</h5>
            <span>
              <FiBriefcase size={15} />
              <span>{ jobType }</span>
            </span>
          </div>

          <div className="salary">
            <h5>R$ { salary }</h5>
            <span>
              <FiDollarSign size={15} />
              <span>Per Month</span>
            </span>
          </div>

          <div className="apply">
            <Button type='primary' isBlock={true} content='Apply Now' />
            <Button type='dark' isBlock={true} content='Cancel' />
          </div>
        </div>
      </div>
    )
  }
}

JobDetails.contextType = ActiveJobContext

export default JobDetails
