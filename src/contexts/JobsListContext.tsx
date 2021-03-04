import { createContext, ReactNode, useState } from 'react'

import { CollectionResponse, Job } from '../types'

interface IJobsListContext {
  jobs: CollectionResponse<Job> | null
  currentPage: number
  isSearching: boolean
  setJobs: (jobs: CollectionResponse<Job> | null) => void
  setCurrentPage: (page: number) => void
  setIsSearching: (isSearching: boolean) => void
}

export const JobsListContext = createContext<IJobsListContext>({} as IJobsListContext)

interface JobsListProviderProps {
  children: ReactNode
}

export function JobsListProvider ({ children }: JobsListProviderProps) {
  const [jobs, setJobs] = useState<CollectionResponse<Job> | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isSearching, setIsSearching] = useState<boolean>(true)

  return (
    <JobsListContext.Provider value={{ jobs, currentPage, isSearching, setJobs, setCurrentPage, setIsSearching }}>
      { children }
    </JobsListContext.Provider>
  )
}
