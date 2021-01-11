import React from 'react'
import { CollectionResponse, Job } from '../../types'

interface IJobsListContext {
  jobs: CollectionResponse<Job> | null
  currentPage: number
  isSearching: boolean
  setJobs: (jobs: CollectionResponse<Job> | null) => void
  setCurrentPage: (page: number) => void
  setIsSearching: (isSearching: boolean) => void
}

const JobsListContext = React.createContext<IJobsListContext>({} as IJobsListContext)

export default JobsListContext
