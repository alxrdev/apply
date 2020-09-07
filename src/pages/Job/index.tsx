import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { MdTrendingFlat, MdQueryBuilder, MdPublic, MdAttachMoney, MdWork } from 'react-icons/md'

import { useAuth } from '../../services/auth'
import { Job as JobEntity } from '../../types'
import api from '../../services/api'

import Header from '../../components/Header'
import Container from '../../components/Container'
import Button from '../../components/Button'

import './styles.scss'

const Job: React.FC = () => {
  const { user } = useAuth()
  const { id } = useParams()
  const [job, setJob] = useState<JobEntity | null>(null)
  const history = useHistory()

  useEffect(() => {
    api.get(`/jobs/${id}`)
      .then(result => {
        const data = result.data.data as JobEntity
        setJob(data)
      })
      .catch(_ => history.push('/'))
  }, [id])

  return (
    <div className="job">
      <Header />

      <Container>
        <div className="actions">
          <button
            className="back-button"
            onClick={() => history.goBack()}
          >
            <MdTrendingFlat size={30} />
            <span>Back to search</span>
          </button>
          { user
            ? (
              <div className="apply">
                { user.role === 'user' && (
                  <>
                    <p>Click in the button below to apply to this job.</p>
                    <Button type='primary' isBlock content='Apply Now' onClick={() => { if (job) history.push(`/apply/${job.id}`) }} />
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
            <div className="job-details">
              <div className="job-header">
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
                    <span>{ job.address.city }</span>
                  </div>
                </div>
              </div>

              <div className="description">
                { job.description } <br/>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil suscipit quibusdam iste ex.</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem officia et aut architecto sequi placeat eveniet necessitatibus quasi praesentium totam fugiat, consequuntur officiis rem voluptate minima voluptatum ex eos, id expedita. Eos ex neque eum labore mollitia, cupiditate nulla officiis, iusto ea corrupti dolorum, temporibus maxime deleniti nisi expedita deserunt.</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente, provident.</p>
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
          )
          : (<h1>404</h1>)
        }
      </Container>
    </div>
  )
}

export default Job
