import React, { useState, useContext, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiBriefcase, FiDollarSign } from 'react-icons/fi'

import { ActiveJobContext } from '../JobsDriectory/ActiveJobProvider'
import { Job } from '../../types'

import './styles.scss'

interface Props {
  job: Job
}

const JobItem: React.FC<Props> = ({ job }) => {
  const { setActiveJob } = useContext(ActiveJobContext)
  const jobItemRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  const { title, employeer, address, jobType, salary } = job

  useEffect(() => {
    document.addEventListener('click', deactiveAllJobs, false)
    return () => document.removeEventListener('click', deactiveAllJobs, false)
  }, [active])

  const toggleJob = () => {
    setActiveJob((!active) ? job : null)
    setActive(!active)
  }

  // deactive the job if the user click out
  const deactiveAllJobs = (event: MouseEvent) => {
    const elements = Array.prototype.map.call(jobItemRef.current?.children, (element) => element)

    const isThis = elements.includes(event.target)

    if (!isThis && active) {
      setActive(false)
    }
  }

  return (
    <div
      className={`job-item ${active ? 'active' : ''}`}
      onClick={toggleJob}
      ref={jobItemRef}
    >
      <div className="avatar">
        <img src="https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/53685cff8c94982b0b74b40fc78a4dcf" alt={title} />
      </div>
      <div className="job-content">
        <div className="title-employeer">
          <h5>{ title }</h5>
          <span><Link to='/'>{ employeer }</Link> <span>14 days ago</span></span>
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
      </div>
    </div>
  )
}

export default JobItem
