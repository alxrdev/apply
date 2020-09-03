import React from 'react'
import ReactDOM from 'react-dom'

import { CookiesProvider } from 'react-cookie'
import { AuthProvider } from './services/auth'

import App from './App'

ReactDOM.render(
  <CookiesProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </CookiesProvider>,
  document.getElementById('root')
)
