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
createRoot(document.getElementById('root')).render(
  // StrictMode wrapper - enables additional checks and warnings in development mode
  // - Identifies components with unsafe lifecycles
  // - Warns about legacy string ref API usage
  // - Detects unexpected side effects in render phase
  <StrictMode>
    {/* Provider wrapper - makes Redux store accessible to all child components via React context */}
    {/* All components can now use useSelector and useDispatch hooks */}
    <Provider store={store}>
      {/* BrowserRouter wrapper - enables client-side routing throughout the application */}
      {/* Allows navigation without full page reloads using HTML5 History API */}
      <BrowserRouter>
        {/* App component - root component containing all routes and application logic */}
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
