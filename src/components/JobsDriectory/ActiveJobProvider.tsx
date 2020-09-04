import React, { useState } from 'react'

import { Job } from '../../types'

interface IActiveJobContext {
  activeJob: Job | null
  setActiveJob: (job: Job | null) => void
}

export const ActiveJobContext = React.createContext<IActiveJobContext>({
  activeJob: null,
  setActiveJob: (job: Job | null) => {}
})

export const ActiveJobProvider: React.FC = ({ children }) => {
  const [activeJob, setJob] = useState<Job | null>(null)

  const setActiveJob = (job: Job | null) => {
    setJob(job)
  }

  return (
    <ActiveJobContext.Provider value={{ activeJob, setActiveJob }}>
      { children }
    </ActiveJobContext.Provider>
  )
}
