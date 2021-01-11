import React, { useState } from 'react'

import { CollectionResponse, Job } from '../../types'
import JobsListContext from './JobsListContext'

export const JobsListProvider: React.FC = ({ children }) => {
  const [jobs, setJobs] = useState<CollectionResponse<Job> | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isSearching, setIsSearching] = useState<boolean>(true)

  return (
    <JobsListContext.Provider value={{ jobs, currentPage, isSearching, setJobs, setCurrentPage, setIsSearching }}>
      { children }
    </JobsListContext.Provider>
  )
}
