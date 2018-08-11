import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <App target={new Date(2018, 7, 17)} />,
  document.getElementById('root')
)
registerServiceWorker()
