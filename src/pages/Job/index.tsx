import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { MdQueryBuilder, MdPublic, MdAttachMoney, MdWork, MdEdit } from 'react-icons/md'
import parser from 'html-react-parser'

import { useAuth } from '../../services/auth'
import { Job as JobEntity } from '../../types'
import api from '../../services/api'

import Header from '../../components/Header'
import Container from '../../components/Container'
import Button from '../../components/Button'
import BackButton from '../../components/BackButton'
import UsersApplied from '../../components/UsersApplied'

import './styles.scss'

const Job: React.FC = () => {
  const { user } = useAuth()
  const { id } = useParams()

  const [job, setJob] = useState<JobEntity | null>(null)
  const [isApplied, setIsApplied] = useState(false)

  const history = useHistory()

  useEffect(() => {
    api.get(`/jobs/${id}`)
      .then(result => {
        const data = result.data.data as JobEntity
        setJob(data)
      })
      .catch(_ => history.push('/'))

    if (user) {
      api.get(`/jobs/${id}/users/${user.id}`)
        .then(result => setIsApplied(true))
        .catch(_ => setIsApplied(false))
    }
  }, [user, id])

  return (
    <div className="job">
      <Header />

      <Container>
        <div className="actions">
          <BackButton text='Back to search' />

          { user
            ? (
              <div className="apply">
                { user.role === 'user' && (
                  <>
                    { !isApplied
                      ? (
                        <>
                          <p>Click in the button below to apply to this job.</p>
                          <Button type='primary' isBlock content='Apply Now' onClick={() => { if (job) history.push(`/apply/${job.id}`) }} />
                        </>
                      ) : (
                        <p>You alredy applied to this job</p>
                      ) }
                  </>
                ) }
              </div>
            )
            : (
              <div className="apply">
                <p>Click in the button below and make login in you accout to apply to this job.</p>
                <Button type='primary' isBlock content='Login' onClick={() => { if (job) history.push(`/login?redirect=/apply/${job.id}`) }} />
              </div>
            ) }
        </div>

        { job
          ? (
            <div>
              <div className="job-details">
                <div className="job-header">
                  { user?.id === job.user.id && (
                    <span
                      className='edit-button'
                      onClick={() => history.push(`/edit-job/${job.id}`)}
                    >
                      <MdEdit size={15} />
                    </span>
                  ) }

                  <h1>{ job.title }</h1>

                  <span className="type">{ job.jobType }</span>

                  <div className="date">
                    <MdQueryBuilder size={18} />
                    <span>{ Intl.DateTimeFormat('pt-BR').format(new Date(job.createdAt)) }</span>
                  </div>
                </div>

                <div className="employeer-header">
                  <div className="avatar">
                    <img src={job.user.avatar} alt={job.user.name}/>
                  </div>

                  <div className="name-location">
                    <h5>{ job.user.name }</h5>

                    <div className="location">
                      <MdPublic size={18} />
                      <span>{ job.address.city }, { job.address.state }</span>
                    </div>
                  </div>
                </div>

                <div className="description">
                  { parser(job.description) }
                </div>

                <div className="infos">
                  <div className="info-location">
                    <h5>Location</h5>
                    <div className="content">
                      <MdPublic size={20} />
                      <span>{ job.address.city }, { job.address.state }</span>
                    </div>
                  </div>

                  <div className="info-salary">
                    <h5>Salary</h5>
                    <div className="content">
                      <MdAttachMoney size={20} />
                      <span>{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(job.salary) } / Month</span>
                    </div>
                  </div>

                  <div className="info-type">
                    <h5>Job Type</h5>
                    <div className="content">
                      <MdWork size={20} />
                      <span>{ job.jobType }</span>
                    </div>
                  </div>
                </div>
              </div>

              { job.user.id === user!.id && (
                <UsersApplied id={job.id} />
              ) }
            </div>
          )
          : (<h1>404</h1>)
        }
      </Container>
    </div>
  )
}

export default Job
