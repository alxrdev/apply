import React from 'react'
import ReactDOM from 'react-dom'

import { CookiesProvider } from 'react-cookie'
import { AuthProvider } from './services/auth'
import { JobsListProvider } from './providers/JobsList'

import App from './App'

ReactDOM.render(
  <CookiesProvider>
    <AuthProvider>
      <JobsListProvider>
        <App />
      </JobsListProvider>
    </AuthProvider>
  </CookiesProvider>,
  document.getElementById('root')
)
