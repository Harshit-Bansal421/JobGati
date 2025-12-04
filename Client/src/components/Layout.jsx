/**
 * Layout Component - Page Wrapper
 * 
 * This component wraps all pages in the application with a consistent layout.
 * It provides Header, Footer, KarmaAI assistant, and Login modal that appear on every page.
 * Uses React Router's Outlet to render child routes within the layout.
 */

// Import React library
import React from 'react';

// Import Outlet - React Router component that renders the current route's component
import { Outlet } from 'react-router-dom';

// Import shared layout components
import Header from './Header';      // Navigation header at the top
import Footer from './Footer';      // Footer at the bottom
import KarmaAI from './KarmaAI';    // Floating AI assistant button
import LoginModal from './LoginModal'; // Modal dialog for login form

// Import Redux hooks for state management
import { useSelector, useDispatch } from 'react-redux';

// Import login action to dispatch when user logs in
import { login } from '../store/slices/authSlice';

/**
 * Layout functional component
 * Wraps the main content ensuring Header and Footer are always present
 */
const Layout = () => {
  // Get dispatch function to trigger Redux actions
  const dispatch = useDispatch();
  
  // Extract login status from Redux auth state
  // isLoggedIn is a boolean indicating if user is authenticated
  const { isLoggedIn } = useSelector((state) => state.auth);
  
  // Local state for login modal visibility
  // showLogin is a boolean - true when modal should be visible
  // setShowLogin is the function to update this state
  // This is UI state (modal visibility) so it stays in component state rather than Redux
  const [showLogin, setShowLogin] = React.useState(false);

  /**
   * handleLogin - Callback function when user successfully logs in
   * Dispatches login action to Redux and closes the modal
   */
  const handleLogin = () => {
    // Dispatch login action with user data (name: "User" is a placeholder)
    dispatch(login({ name: "User" })); // Dispatch login action
    
    // Close the login modal after successful login
    setShowLogin(false);
  };

  // Render the layout structure
  return (
    // Main container - flex column layout with minimum full screen height
    // bg-gray-50 - light gray background in light mode
    // text-dark - dark text color for readability
    // font-sans - uses custom sans-serif font family
    <div className="min-h-screen flex flex-col bg-gray-50 text-dark font-sans">
      {/* Header component - navigation bar at top */}
      {/* Pass setShowLogin function to Header so it can open the login modal */}
      <Header setShowLogin={setShowLogin} />

      {/* Main content area where different pages will be rendered */}
      {/* grow - takes up all available vertical space between header and footer */}
      <main className="grow">
        {/* Outlet - React Router component that renders the current route */}
        {/* This is where HomePage, Dashboard, LoginPage, etc. will appear */}
        <Outlet />
      </main>

      {/* Footer component - appears at bottom of every page */}
      <Footer />

      {/* KarmaAI - floating AI assistant button visible on all pages */}
      {/* Fixed position in bottom-right corner */}
      <KarmaAI />

      {/* Login Modal - conditionally rendered when showLogin is true */}
      {/* && operator - only renders LoginModal if showLogin is true */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}  // Callback to close modal (X button or backdrop click)
          onLogin={handleLogin}                // Callback when login form is submitted
        />
      )}
    </div>
  );
};

// Export Layout component as default export
export default Layout;
