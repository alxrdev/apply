import React from 'react'
import { useHistory } from 'react-router-dom'
import { MdTrendingFlat } from 'react-icons/md'

import './styles.scss'

const BackButton: React.FC = () => {
  const history = useHistory()

  return (
    <button
      className="back-button"
      onClick={() => history.goBack()}
    >
      <MdTrendingFlat size={30} />
      <span>Back to search</span>
    </button>
  )
}

export default BackButton
