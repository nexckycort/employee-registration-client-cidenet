import React from 'react'
import ReactDOM from 'react-dom'

import reportWebVitals from 'reportWebVitals'

import App from 'infrastructure/ui/App'
import { AuthProvider } from 'infrastructure/ui/hooks/useAuth'

import 'bootstrap/dist/js/bootstrap.bundle'
import 'index.scss'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()