/**
 * Theme Redux Slice
 * 
 * This slice manages the application's theme (dark/light mode).
 * It handles theme persistence via localStorage, system preference detection,
 * and applies theme changes to the DOM for Tailwind's dark mode.
 */

// Import createSlice - Redux Toolkit function to create a slice of state with reducers
import { createSlice } from '@reduxjs/toolkit';

/**
 * Helper function: Get initial theme from localStorage or system preference
 * Priority order:
 * 1. User's saved preference in localStorage
 * 2. System/browser dark mode preference
 * 3. Default to 'light' mode
 * @returns {string} 'dark' or 'light'
 */
const getInitialTheme = () => {
  // Try to get saved theme from localStorage (persists across sessions)
  const savedTheme = localStorage.getItem('jobgati_theme');
  
  // If user has previously selected a theme, use that
  if (savedTheme) {
    return savedTheme; // Returns 'dark' or 'light'
  }
  
  // Check if user's system/browser prefers dark mode
  // window.matchMedia checks CSS media query
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'; // User's system is set to dark mode
  }
  
  // Default to light mode if no preference found
  return 'light';
};

// Create the theme slice
const themeSlice = createSlice({
  // Name of the slice - used in action type strings and DevTools
  name: 'theme',
  
  // Initial state - determines theme when app first loads
  initialState: {
    mode: getInitialTheme(), // 'light' or 'dark' - calls helper function to determine initial theme
  },
  
  // Reducers - pure functions that handle theme state updates
  reducers: {
    // initializeTheme - applies the current theme to the DOM on app load
    // This is called once when the app starts (in App.jsx useEffect)
    initializeTheme: (state) => {
      // Apply the current theme mode to the HTML document element
      // Tailwind's dark mode is triggered by the 'dark' class on <html>
      if (state.mode === 'dark') {
        // Add 'dark' class to enable all dark: variants in Tailwind
        document.documentElement.classList.add('dark');
      } else {
        // Remove 'dark' class to use light mode styles
        document.documentElement.classList.remove('dark');
      }
    },
    
    // toggleTheme - switches between light and dark mode
    // This is called when user clicks the theme toggle button
    toggleTheme: (state) => {
      // Toggle mode: if currently light, switch to dark, and vice versa
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      
      // Save the new theme preference to localStorage for persistence
      localStorage.setItem('jobgati_theme', state.mode);
      
      // Debug log to help with troubleshooting theme issues
      console.log('Theme toggled to:', state.mode); // Debug log
      
      // Update HTML document element class for Tailwind dark mode
      if (state.mode === 'dark') {
        // Add 'dark' class to activate dark mode styles
        document.documentElement.classList.add('dark');
        console.log('Added dark class to html element'); // Debug log
      } else {
        // Remove 'dark' class to use light mode styles
        document.documentElement.classList.remove('dark');
        console.log('Removed dark class from html element'); // Debug log
      }
    },
    
    // setTheme - sets theme to a specific mode (dark or light)
    // Payload should be 'dark' or 'light' string
    // Similar to toggleTheme but allows explicit theme selection
    setTheme: (state, action) => {
      // Set mode to the value provided in action payload
      state.mode = action.payload;
      
      // Save the theme preference to localStorage for persistence
      localStorage.setItem('jobgati_theme', state.mode);
      
      // Update HTML document element class for Tailwind dark mode
      if (state.mode === 'dark') {
        // Add 'dark' class to enable dark mode styles
        document.documentElement.classList.add('dark');
      } else {
        // Remove 'dark' class to use light mode styles
        document.documentElement.classList.remove('dark');
      }
    },
  },
});

// Export action creators for use in components
// Usage: dispatch(toggleTheme()) or dispatch(setTheme('dark'))
export const { initializeTheme, toggleTheme, setTheme } = themeSlice.actions;

// Export the reducer - this is added to the store in store/index.js
export default themeSlice.reducer;
