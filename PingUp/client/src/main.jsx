import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'

import App from './App.jsx'
import './index.css'

// Get Clerk publishable key

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const root = createRoot(document.getElementById('root'))

if (!PUBLISHABLE_KEY) {
  root.render(
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#b91c1c' }}>Missing Publishable Key</h2>
      <p>
        Add <strong>VITE_CLERK_PUBLISHABLE_KEY</strong> to your{' '}
        <strong>.env</strong> file and restart the dev server.
      </p>
    </div>
  )
} else {
  root.render(
    <React.StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ClerkProvider>
    </React.StrictMode>
  )
}
