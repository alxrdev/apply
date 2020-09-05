import React from 'react'
import { useParams } from 'react-router-dom'

import './styles.scss'

const Apply: React.FC = () => {
  const { id } = useParams()

  return (
    <h1>Apply to job { id }</h1>
  )
}

export default Apply
