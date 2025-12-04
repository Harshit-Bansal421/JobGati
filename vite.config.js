/**
 * Vite Configuration File
 * 
 * This file configures the Vite build tool for the JobGati application.
 * Vite is a modern frontend build tool that provides fast development server
 * and optimized production builds.
 */

// Import the defineConfig function from Vite to get type-checking and autocomplete
import { defineConfig } from 'vite'

// Import the React plugin for Vite which enables React Fast Refresh and JSX support
import react from '@vitejs/plugin-react'

// Import the Tailwind CSS plugin for Vite to process Tailwind directives
import tailwindcss from '@tailwindcss/vite'

// Official Vite documentation: https://vite.dev/config/
// Export the Vite configuration object using defineConfig wrapper
export default defineConfig({
  // Plugins array - Vite plugins extend build functionality
  plugins: [
    react(),      // Enable React support with Fast Refresh for instant HMR (Hot Module Replacement)
    tailwindcss() // Enable Tailwind CSS processing and optimization
  ],
})