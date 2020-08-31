import React from 'react'

import Routes from './Routes'

import './global.scss'

class App extends React.Component {
  render () {
    return (
      <div className="page">
        <Routes />
      </div>
    )
  }
}

export default App
