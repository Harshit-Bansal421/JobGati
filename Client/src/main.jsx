/**
 * Main Entry Point for JobGati React Application
 * 
 * This file is the first JavaScript file executed when the application loads.
 * It sets up the core application infrastructure including React, Redux, and Routing.
 */

// Import StrictMode - React component that enables additional development checks and warnings
import { StrictMode } from 'react'

// Import createRoot - modern React 18+ API for rendering the application into the DOM
import { createRoot } from 'react-dom/client'

// Import Provider - React-Redux component that makes Redux store available to all components
import { Provider } from 'react-redux'

// Import BrowserRouter - React Router component for client-side routing using HTML5 history API
import { BrowserRouter } from 'react-router-dom'

// Import the Redux store configuration which contains all application state
import { store } from './store'

// Import global CSS styles including Tailwind directives and custom styles
import './index.css'

// Import the root App component which contains all application routes and logic
import App from './App.jsx'

// Create a React root and render the application
// document.getElementById('root') - finds the <div id="root"></div> in index.html
// createRoot() - creates a React 18 root for rendering (replaces legacy ReactDOM.render)
// .render() - renders the component tree into the root
// Import ClerkProvider
import { ClerkProvider } from '@clerk/clerk-react'
import AuthSync from './components/AuthSync'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  console.warn("Missing Publishable Key. Please set VITE_CLERK_PUBLISHABLE_KEY in your .env file.")
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <BrowserRouter>
          <AuthSync />
          <App />
        </BrowserRouter>
      </ClerkProvider>
    </Provider>
  </StrictMode>,
)
