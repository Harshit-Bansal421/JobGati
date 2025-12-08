
import React, { useState } from 'react';
// Import useNavigate for programmatic navigation after login
import { useNavigate } from 'react-router-dom';
// Import useDispatch for Redux actions
import { useDispatch } from 'react-redux';

import { createBusiness } from "../services/BusinessServices";
import { createUser } from '../services/userServices';
import { createJobSeeker } from '../services/JobSeekerSeeker';

// Import Redux actions
import { login } from '../store/slices/authSlice';
import { setUserData } from '../store/slices/userSlice';
import { useSelector } from 'react-redux';

// Import useNavigate for programmatic navigation after login
const LoginPage = () => {
  // Local state for email input field
  const [email, setEmail] = useState("");

  // Local state for password input field
  const [password, setPassword] = useState("");

  // Local state for username input field
  const [username, setUsername] = useState("");

  // Local state for displaying error messages
  const [error, setError] = useState("");

  // Get navigate function for route navigation
  const navigate = useNavigate();

  // Get dispatch function to trigger Redux actions
  const dispatch = useDispatch();
  // const user=useSelector((state)=>state.auth.user) // Not used/needed here for registration input
  // const type=useSelector((state)=>state.auth.type) // Removed: type should be selected by user

  /**
   * handleLogin - Processes registration attempt
   */
  // Local state for user type
  const [type, setType] = useState("jobseeker"); // Default to jobseeker

  const handleLogin = async () => {
    if (!username || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    const userData = {
      username,
      email,
      password,
      type
    };

    try {
      console.log(">>> Starting Registration. UserData:", userData);
      // 1. Dispatch Login (or Register) action - mostly for state update if needed immediately
      dispatch(login({ data: userData }));

      // 2. Call APIs based on type
      let res1, res2;

      // Always create the base User account
      // Note: userServices.createUser usually returns the response data
      res1 = await createUser(userData);
      console.log("User creation response:", res1);

      if (type === "business") {
        res2 = await createBusiness(userData);
        console.log("Business creation response:", res2);
        if (res2 && res2.success !== false) { // basic check depending on service return
          dispatch(setUserData(res2.data || res2));
          navigate("/business-dashboard");
        }
      } else if (type === "jobseeker") {
        res2 = await createJobSeeker(userData);
        console.log("JobSeeker creation response:", res2);
        // createJobSeeker returns res.json() directly. 
        dispatch(setUserData(res2.data || res2));
        navigate("/jobseeker-dashboard");
      } else {
        // Default generic user
        navigate("/user-dashboard");
      }

    } catch (err) {
      console.error("Registration Error:", err);
      setError("Registration failed: " + err.message);
    }
  };

  // Render the login page
  return (
    <div className='dark:bg-gray-900 flex justify-center items-center'>
      {/* Main container - centered with max width and top margin */}
      <div className="container mx-auto px-5 max-w-md pb-10 bg-gray-100 mt-17 mb-17 pt-3 rounded-lg dark:bg-gray-800">
        {/* Page heading - large, bold, centered */}
        <h2 className="text-3xl font-bold mb-8 text-center dark:text-gray-200">Register</h2>

        {/* Error message display - only shown if error exists */}
        {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}

        {/* User Type Selection */}
        <div className="mb-5">
          <label className="block mb-2 font-medium dark:text-gray-200">I am a:</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 dark:text-gray-200 dark:bg-gray-700"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="jobseeker">Job Seeker</option>
            <option value="business">Business</option>
            <option value="user">User</option>
          </select>
        </div>

        {/* input field container */}
        <div className="mb-5">
          {/* user label */}
          <label className="block mb-2 font-medium dark:text-gray-200">User:</label>
          {/* username input - controlled component */}
          <input
            className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 dark:text-gray-200"
            type="email"              // HTML5 email validation
            value={username}              // Controlled by email state
            onChange={(e) => setUsername(e.target.value)}  // Updates state on change
          />
        </div>

        {/* Email input field container */}
        <div className="mb-5">
          {/* Email label */}
          <label className="block mb-2 font-medium dark:text-gray-200">Email:</label>
          {/* Email input - controlled component */}
          <input
            className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 dark:text-gray-200"
            type="email"              // HTML5 email validation
            value={email}              // Controlled by email state
            onChange={(e) => setEmail(e.target.value)}  // Updates state on change
          />
        </div>

        {/* Password input field container */}
        <div className="mb-5">
          {/* Password label */}
          <label className="block mb-2 font-medium dark:text-gray-200">Password:</label>
          {/* Password input - controlled component */}
          <input
            className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 dark:text-gray-200"
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
          Register
        </button>
      </div>
    </div>
  );
};

// Export LoginPage component as default export
export default LoginPage;