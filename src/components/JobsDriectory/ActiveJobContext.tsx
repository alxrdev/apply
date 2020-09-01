import React from 'react'
import { Job } from '../../types'

export const ActiveJobContext = React.createContext<{ activeJob: Job | null, setActiveJob:(job: Job | null) => void }> ({
  activeJob: null,
  setActiveJob: (job: Job | null) => {}
})
