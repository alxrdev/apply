import React from 'react'
import { Link } from 'react-router-dom'
import { FiBriefcase, FiDollarSign } from 'react-icons/fi'

import { ActiveJobContext } from '../JobsDriectory/ActiveJobContext'
import { Job } from '../../types'

import './styles.scss'

interface Props {
  job: Job
}

interface State {
  actived: boolean
}

class JobItem extends React.Component<Props, State> {
  private refContainer: React.RefObject<HTMLDivElement>

  constructor (props: Props) {
    super(props)

    this.state = { actived: false }

    this.refContainer = React.createRef<HTMLDivElement>()
  }

  handleJobClick = (event: React.MouseEvent) => {
    this.toggleJob()
  }

  toggleJob = () => {
    this.setState({ actived: !this.state.actived }, () => {
      // change the active job in the context
      this.context.setActiveJob((this.state.actived) ? this.props.job : null)
    })
  }

  // deactive the job if the user click out
  deactiveAllJobs = (event: MouseEvent) => {
    const elements = Array.prototype.map.call(this.refContainer?.current?.children, (element) => element)

    const isThis = elements.includes(event.target)

    if (!isThis && this.state.actived) {
      this.setState({ actived: false })
    }
  }

  componentDidMount () {
    document.addEventListener('click', this.deactiveAllJobs, true)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.deactiveAllJobs, true)
  }

  render () {
    const { title, employeer, address, jobType, salary } = this.props.job

    return (
      <div
        className={`job-item ${this.state.actived ? 'active' : ''}`}
        onClick={this.handleJobClick}
        ref={this.refContainer}
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
}

JobItem.contextType = ActiveJobContext

export default JobItem
