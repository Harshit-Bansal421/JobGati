/**
 * App Component - Root Component for JobGati Application
 * 
 * This is the main component that sets up routing and initializes core features
 * like internationalization (i18n) and theme management. It wraps all application
 * pages and handles global state initialization.
 */

// Import React and useEffect hook for side effects (initialization tasks)
import React, { useEffect } from 'react';

// Import routing components from React Router for client-side navigation
import { Routes, Route } from 'react-router-dom';

// Import Redux hooks for dispatching actions and accessing state
import { useDispatch, useSelector } from 'react-redux';

// Import action to fetch translation data from API for internationalization
import { fetchTranslations } from './store/slices/languageSlice';

// Import action to initialize theme (dark/light mode) from localStorage or system preference
import { initializeTheme } from './store/slices/themeSlice';

// Import Layout component which provides Header and Footer wrapper for all pages
import Layout from './components/Layout';

// Import HomePage component - landing page with Hero section and features
import HomePage from './components/HomePage';

// Import registration component for job seekers (individuals looking for jobs)
import JobSeekerRegistration from './components/JobSeekerRegistration';

// Import registration component for businesses (employers posting jobs)
import BusinessRegistration from './components/BusinessRegistration';

// Import SignUpPage component - allows users to choose registration type
import SignUpPage from './components/SignUpPage';

// Import LoginPage component - handles user authentication
import LoginPage from './components/LoginPage';

// Import Dashboard component - user-specific dashboard after login
import Dashboard from './components/Dashboard';
import About from './components/About';
import BusinessDashboard from './components/BusinessDashboard';
import JobseekerDashboard from './components/JobSeekerDashboard';
import UserDashboard from './components/UserDashboard';
import ServiceSeeker from './components/ServiceSeeker';

/**
 * App functional component
 * Manages application-wide initialization and routing
 */
function App() {
  // Get dispatch function to trigger Redux actions
  const dispatch = useDispatch();
  
  // Extract loading state from language slice to show loading indicator while fetching translations
  const { loading } = useSelector((state) => state.language);
  
  // Extract current theme mode (dark or light) from theme slice
  const { mode } = useSelector((state) => state.theme);

  // Effect: Fetch translations and initialize theme when app first loads
  // This runs once when the component mounts (empty dependency array means "on mount only")
  useEffect(() => {
    // Dispatch action to fetch translation data from API for the selected language
    dispatch(fetchTranslations());
    
    // Dispatch action to initialize theme from localStorage or system preference
    dispatch(initializeTheme()); // Initialize theme on mount
  }, [dispatch]); // Re-run only if dispatch changes (which it never does, so effectively runs once)

  // Effect: Apply dark mode class to HTML document when theme changes
  // This enables Tailwind's dark mode by adding/removing 'dark' class on <html> element
  useEffect(() => {
    // If theme mode is 'dark', add 'dark' class to enable dark mode styles
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      // If theme mode is 'light', remove 'dark' class to use light mode styles
      document.documentElement.classList.remove('dark');
    }
  }, [mode]); // Re-run whenever mode changes (user toggles dark/light mode)

  // Show loading screen while translations are being fetched from API
  // This prevents rendering the app with missing translation text
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Return the main application JSX structure
  return (
    // Routes component - container for all route definitions
    <Routes>
      {/* Parent route with Layout wrapper - provides Header and Footer for all child routes */}
      <Route path="/" element={<Layout />}>
        {/* Index route - renders HomePage at the root path "/" */}
        <Route index element={<HomePage />} />
        
        {/* Job seeker registration route - form for individuals seeking jobs */}
        <Route path="register-seeker" element={<JobSeekerRegistration />} />
        
        {/* Business registration route - form for companies/employers */}
        <Route path="register-business" element={<BusinessRegistration />} />
        
        {/* Sign up page route - user type selection (seeker vs business) */}
        <Route path="signup" element={<SignUpPage />} />
        
        {/* Login page route - authentication form */}
        <Route path="login" element={<LoginPage />} />
        
        {/* Dashboard route - protected user dashboard (requires login) */}
        <Route path="business-dashboard" element={<BusinessDashboard />} />
        <Route path="jobseeker-dashboard" element={<JobseekerDashboard />} />
        <Route path="user-dashboard" element={<UserDashboard />} />
        <Route path="about" element={<About />} />
        <Route path="service-seeker" element={<ServiceSeeker />} />
      </Route>
    </Routes>
  );
}

// Export App component as default export for use in main.jsx
export default App;

