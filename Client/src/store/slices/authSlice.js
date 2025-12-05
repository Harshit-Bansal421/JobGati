/**
 * Authentication Redux Slice
 * 
 * This slice manages authentication state for the JobGati application.
 * It tracks whether a user is logged in and stores the user's basic info.
 * Redux Toolkit's createSlice automatically generates action creators and reducers.
 */

// Import createSlice - Redux Toolkit function to create a slice of state with reducers
import { createSlice } from '@reduxjs/toolkit';

// Create the authentication slice
const authSlice = createSlice({
  // Name of the slice - used in action type strings and DevTools
  name: 'auth',
  
  // Initial state when the app first loads
  initialState: {
    isLoggedIn: false, // Boolean - tracks if the user is currently authenticated
    user: null,        // Object or null - stores user details like name, email, id
    type:null , //which type of user is logged in
    isRegisered:false, // Boolean - tracks if the user is currently registered
    isVerified:false, // Boolean - tracks if the user is currently verified
    loginDetails:null // Object or null - stores user details like name, email, id
  },
  
  // Reducers - pure functions that handle state updates
  // Each reducer function becomes an action that can be dispatched
  reducers: {
    // login reducer - handles user authentication
    // When dispatched, sets user as logged in and stores user data
    register: (state, action) => {
      // Set logged in status to true
      state.isRegisered = true;
      
      // Store user data from action payload (e.g., { name: 'John', email: 'john@example.com' })
      state.user = action.payload.data; // Payload could be user data
      state.type = action.payload.type; // Payload could be user data
    },

    login: (state, action) => {
      // Set logged in status to true
      state.isLoggedIn = true;
      
      // Store user data from action payload (e.g., { name: 'John', email: 'john@example.com' })
      state.loginDetails = action.payload.data; // Payload could be user data
    },
    
    // logout reducer - handles user sign out
    // When dispatched, clears authentication state
    logout: (state) => {
      // Set logged in status to false
      state.isLoggedIn = false;
      
      // Clear user data
      state.user = null;
      state.type = null;
      state.isRegisered = false;
      state.isVerified = false;
      state.loginDetails = null;
    },

  },
});

// Export action creators - these can be imported and dispatched in components
// Usage: dispatch(login(userData)) or dispatch(logout())
export const { login, logout,register } = authSlice.actions;

// Export the reducer - this is added to the store in store/index.js
export default authSlice.reducer;
