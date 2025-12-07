/**
 * User Profile Redux Slice
 * 
 * This slice manages user profile data including skills, experience, resume, and certificates.
 * It's used for both job seekers (tracking their skills) and businesses (tracking required skills).
 * The state is shared across components through Redux.
 */

// Import createSlice - Redux Toolkit function to create a slice of state with reducers
import { createSlice } from '@reduxjs/toolkit';

// Create the user profile slice
const userSlice = createSlice({
  // Name of the slice - used in action type strings and DevTools
  name: 'user',
  
  // Initial state with default demo data
  // Initial state derived from database structure
  initialState: {
    data: null, // Stores the full user profile (JobSeeker or Business)
  },
  
  // Reducers
  reducers: {
    // setUserData - stores the fetched user data
    setUserData: (state, action) => {
      state.data = action.payload;
    },

    // updateUserData - updates specific fields in the user data
    // Payload should be an object with fields to update: { name: 'New Name', age: 25 }
    updateUserData: (state, action) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };
      }
    },
    
    // clearUserData - clears the user data on logout
    clearUserData: (state) => {
      state.data = null;
    }
  },
});

// Export all action creators for use in components
// These can be dispatched to update the user state
export const { 
  setUserData, 
  updateUserData, 
  clearUserData
} = userSlice.actions;

// Export the reducer - this is added to the store in store/index.js
export default userSlice.reducer;
