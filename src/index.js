import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'

const app = document.getElementById('app')
ReactDOM.render(<App />, app)

if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(<App />, app)
  })
}
