/**
 * LoginPage Component - Dedicated Login Page  
 * 
 * This is a full-page login component (as opposed to the LoginModal).
 * It handles user authentication, stores credentials in localStorage,
 * and redirects to dashboard upon successful login.
 */

// Import React and useState hook for managing form state
import React, { useState } from 'react';

// Import useNavigate for programmatic navigation after login
import { useNavigate } from 'react-router-dom';

// Import Redux hooks for state management
import { useDispatch } from 'react-redux';

// Import login action to update authentication state
import { login } from '../store/slices/authSlice';

/**
 * LoginPage functional component
 * Renders a centered login form on a full page
 */
const LoginPage = () => {
  // Local state for email input field
  const [email, setEmail] = useState("");
  
  // Local state for password input field
  const [password, setPassword] = useState("");
  
  // Local state for displaying error messages
  const [error, setError] = useState("");
  
  // Get navigate function for route navigation
  const navigate = useNavigate();
  
  // Get dispatch function to trigger Redux actions
  const dispatch = useDispatch();

  /**
   * handleLogin - Processes login attempt
   * Validates credentials, stores in localStorage, updates Redux, and navigates to dashboard
   */
  const handleLogin = async () => {
    // Mock success - validate that both fields have values
    if (email && password) {
        // Create user data object (in production, this would come from API response)
        const userData = { name: "Abhishek Jaiswal", email };
        
        // Store authentication token in localStorage for session persistence
        localStorage.setItem("jobgati_token", "dummy_token");
        
        // Store user data in localStorage (in production, use secure httpOnly cookies)
        localStorage.setItem("jobgati_user", JSON.stringify(userData));

        // Update Redux state - marks user as logged in and stores user data
        dispatch(login(userData));

        // Show success message to user
        alert("Login successful!");

        // Navigate to dashboard page
        navigate("/dashboard");
    } else {
        // Show error if fields are empty
        setError("Please enter email and password");
    }
  };

  // Render the login page
  return (
    // Main container - centered with max width and top margin
    <div className="container mx-auto px-5 mt-12 max-w-md">
      {/* Page heading - large, bold, centered */}
      <h2 className="text-3xl font-bold mb-8 text-center">Login</h2>

      {/* Error message display - only shown if error exists */}
      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}

      {/* Email input field container */}
      <div className="mb-5">
        {/* Email label */}
        <label className="block mb-2 font-medium">Email:</label>
        {/* Email input - controlled component */}
        <input
          className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
          type="email"              // HTML5 email validation
          value={email}              // Controlled by email state
          onChange={(e) => setEmail(e.target.value)}  // Updates state on change
        />
      </div>

      {/* Password input field container */}
      <div className="mb-5">
        {/* Password label */}
        <label className="block mb-2 font-medium">Password:</label>
        {/* Password input - controlled component */}
        <input
          className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
          type="password"            // Masks password characters
          value={password}           // Controlled by password state
          onChange={(e) => setPassword(e.target.value)}  // Updates state on change
        />
      </div>

      {/* Login button - green success color, full width */}
      <button 
        className="w-full bg-success text-white hover:bg-green-600 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300" 
        onClick={handleLogin}  // Calls handleLogin when clicked
      >
        Login
      </button>
    </div>
  );
};

// Export LoginPage component as default export
export default LoginPage;
