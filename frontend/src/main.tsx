import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Providers } from './shared/providers/index.tsx'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <App/>
    </Providers>
  </React.StrictMode>,
)
