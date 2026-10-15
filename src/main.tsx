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

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // enregistrement du service worker ignoré
    })
  })
}
