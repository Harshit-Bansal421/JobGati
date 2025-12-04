/**
 * ESLint Configuration File
 * 
 * This file configures ESLint for the JobGati project.
 * ESLint is a static code analysis tool for identifying problematic patterns
 * in JavaScript/React code and enforcing code quality standards.
 */

// Import the base JavaScript ESLint configuration
import js from '@eslint/js'

// Import global variables definitions for different environments (browser, node, etc.)
import globals from 'globals'

// Import React Hooks plugin to enforce Rules of Hooks and best practices
import reactHooks from 'eslint-plugin-react-hooks'

// Import React Refresh plugin to ensure components are compatible with Fast Refresh
import reactRefresh from 'eslint-plugin-react-refresh'

// Import ESLint configuration utilities (defineConfig for type safety, globalIgnores for exclusions)
import { defineConfig, globalIgnores } from 'eslint/config'

// Export the ESLint configuration as an array of config objects (flat config format)
export default defineConfig([
  // First config object: Specify files/patterns to ignore during linting
  globalIgnores(['dist']), // Ignore the 'dist' folder (production build output)
  
  // Second config object: Main linting configuration
  {
    // Specify which files this configuration applies to (all .js and .jsx files)
    files: ['**/*.{js,jsx}'],
    
    // Extend from pre-configured rule sets
    extends: [
      js.configs.recommended,                   // ESLint's recommended JavaScript rules
      reactHooks.configs.flat.recommended,      // React Hooks best practices and rules
      reactRefresh.configs.vite,                // React Refresh rules for Vite projects
    ],
    
    // Configure language parsing options
    languageOptions: {
      ecmaVersion: 2020,              // Parse code using ECMAScript 2020 syntax features
      globals: globals.browser,        // Include browser global variables (window, document, etc.)
      
      // Parser-specific options
      parserOptions: {
        ecmaVersion: 'latest',         // Use the latest ECMAScript version for parsing
        ecmaFeatures: { jsx: true },   // Enable JSX syntax parsing
        sourceType: 'module',          // Code uses ES modules (import/export)
      },
    },
    
    // Custom rules that override or add to the extended configurations
    rules: {
      // Allow unused variables if they start with capital letter or underscore
      // This is useful for React components or constants that are exported but not used locally
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
