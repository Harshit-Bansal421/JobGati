/**
 * Language/Internationalization (i18n) Redux Slice
 * 
 * This slice manages language selection and translation data for the JobGati application.
 * It fetches translations from a JSON API and handles loading/error states.
 * Uses Redux Toolkit's createAsyncThunk for handling asynchronous API calls.
 */

// Import createSlice - creates a slice of state with reducers
// Import createAsyncThunk - creates async action creators for API calls
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Async thunk to fetch translations from the public folder
 * 
 * createAsyncThunk is a special Redux Toolkit function that:
 * 1. Handles async logic (API calls, fetch requests)
 * 2. Automatically dispatches pending/fulfilled/rejected actions
 * 3. Simplifies loading state management
 * 
 * This fetches translation.json from the public folder containing
 * translations for all supported languages.
 * 
 * @returns {Promise<Object>} Translation data object from API
 */
export const fetchTranslations = createAsyncThunk(
  // Action type string - will be prefixed to pending/fulfilled/rejected actions
  'language/fetchTranslations',
  
  // Async function - performs the actual API call
  async () => {
    // Fetch translation.json from public folder (served at root by Vite)
    const response = await fetch('/translation.json');
    
    // Parse JSON response to JavaScript object
    const data = await response.json();
    
    // Return data - this becomes action.payload in fulfilled case
    return data;
  }
);

// Create the language slice
const languageSlice = createSlice({
  // Name of the slice - used in action type strings and DevTools
  name: 'language',
  
  // Initial state before any translations are loaded
  initialState: {
    currentLanguage: 'en', // String - default language code is English ('en')
    translations: {},      // Object - will hold all translation data for all languages
    loading: true,         // Boolean - true while fetching translations, prevents app render
    error: null,           // String or null - stores error message if fetch fails
  },
   
  // Regular reducers for synchronous state updates
  reducers: {
    // setLanguage - changes the current active language
    // Payload should be a language code string like 'en', 'hi', 'pa', etc.
    setLanguage: (state, action) => {
      // Update current language to the code provided in action payload
      state.currentLanguage = action.payload;
    },
  },
  
  // Extra reducers - handles actions created by createAsyncThunk
  // These respond to the async states of fetchTranslations
  extraReducers: (builder) => {
    // Builder pattern allows us to add cases for async actions
    // Each async thunk has three states: pending, fulfilled, rejected
    builder
      // Case 1: pending - fetch request has started but not completed
      .addCase(fetchTranslations.pending, (state) => {
        // Set loading to true to show loading indicator
        state.loading = true;
      })
      
      // Case 2: fulfilled - fetch request succeeded
      .addCase(fetchTranslations.fulfilled, (state, action) => {
        // Store fetched translation data in state
        // action.payload contains the data returned from the async function
        state.translations = action.payload;
        
        // Set loading to false - translations are now available
        state.loading = false;
      })
      
      // Case 3: rejected - fetch request failed (network error, 404, etc.)
      .addCase(fetchTranslations.rejected, (state, action) => {
        // Store error message for debugging or showing to user
        state.error = action.error.message;
        
        // Set loading to false - stop showing loading indicator
        state.loading = false;
      });
  },
});

// Export the synchronous action creator for changing language
// Usage: dispatch(setLanguage('hi')) to switch to Hindi
export const { setLanguage } = languageSlice.actions;

// Export the reducer - this is added to the store in store/index.js
export default languageSlice.reducer;
