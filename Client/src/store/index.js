/**
 * Redux Store Configuration
 * 
 * This file creates and configures the Redux store for global state management.
 * The store is the single source of truth for all application state.
 * It combines multiple slice reducers to manage different parts of the state.
 */

// Import configureStore - Redux Toolkit's function to create the store with good defaults
// It automatically includes Redux DevTools, thunk middleware, and immutability checks
import { configureStore } from '@reduxjs/toolkit';

// Import language reducer - manages translation data and current language selection
import languageReducer from './slices/languageSlice';

// Import auth reducer - manages authentication state (login status, user info)
import authReducer from './slices/authSlice';

// Import user reducer - manages user profile data and preferences
import userReducer from './slices/userSlice';

// Import theme reducer - manages dark/light mode theme state
import themeReducer from './slices/themeSlice';

// Import clerk reducer - manages Clerk authentication and profile data
import clerkReducer from './slices/clerkSlice';

// Configure and create the Redux store
// This is the central place where all application state lives
// The store is provided to React components via Provider in main.jsx
export const store = configureStore({
  // Reducer object - combines all slice reducers into the root reducer
  // Each key becomes a slice of state accessible via useSelector
  reducer: {
    language: languageReducer,  // state.language - manages i18n translations and selected language
    auth: authReducer,          // state.auth - manages authentication and login state
    user: userReducer,          // state.user - manages user profile and personal data
    theme: themeReducer,        // state.theme - manages dark/light mode preferences
    clerk: clerkReducer,        // state.clerk - manages Clerk user data and profile completion
  },
});
