import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Providers } from './shared/providers/index.tsx'
import { RouterProvider } from 'react-router-dom'
import { RouterConfig } from './pages/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={RouterConfig}/>
    </Providers>
  </React.StrictMode>,
)
