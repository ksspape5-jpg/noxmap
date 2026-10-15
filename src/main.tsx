import React from 'react'
import ReactDOM from 'react-dom/client'
// Les styles globaux doivent être chargés avant ceux des composants.
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
