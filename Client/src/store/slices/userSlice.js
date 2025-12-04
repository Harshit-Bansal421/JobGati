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
  initialState: {
    // Array of skill strings - represents what skills the user currently has
    // Default skills for demo purposes showing different skill levels (L1, L2, L3)
    skills: [
      "Welding L2",                  // User has intermediate welding skills
      "Digital Literacy L1",         // User has basic digital literacy
      "Solar Panel Installation L1", // User has basic solar panel installation skills
    ],
    
    // Array of required skill strings - for business view to show what skills are needed
    // Default required skills for business demo
    requiredSkills: [
      "Welding L3",          // Business requires advanced welding skills
      "Solar Installation L2", // Business requires intermediate solar installation skills
    ],
    
    // Array of experience objects - stores job history
    // Each experience object has: { role, company, duration, description }
    experience: [], // Initially empty, populated when user adds work experience
    
    // Resume file - stores uploaded resume document
    // Can be a File object (from file input) or metadata about the uploaded file
    resume: null,   // Initially null until user uploads a resume
    
    // Array of certificate files or metadata - stores uploaded certifications
    // Each certificate can be a File object or metadata about the certificate
    certificates: [], // Initially empty, populated when user adds certificates
  },
  
  // Reducers - pure functions that handle different state updates
  reducers: {
    // setUserSkills - replaces entire skills array with new array
    // Used when loading user skills from database or bulk update
    setUserSkills: (state, action) => {
      // Replace current skills with the array provided in action payload
      state.skills = action.payload;
    },
    
    // addUserSkill - adds a single skill to the existing skills array
    // Used when user adds one skill at a time through UI
    addUserSkill: (state, action) => {
      // Push new skill string to the end of skills array
      state.skills.push(action.payload);
    },
    
    // setRequiredSkills - replaces entire required skills array
    // Used by businesses to set what skills they're looking for in candidates
    setRequiredSkills: (state, action) => {
      // Replace current required skills with the array provided in action payload
      state.requiredSkills = action.payload;
    },
    
    // addExperience - adds a work experience entry to the experience array
    // Payload should be an object: { role, company, duration, description }
    addExperience: (state, action) => {
      // Add new experience object to the end of experience array
      state.experience.push(action.payload);
    },
    
    // removeExperience - removes an experience entry at specific index
    // Payload should be the index number of the experience to remove
    removeExperience: (state, action) => {
      // Remove 1 element at the index specified in payload
      state.experience.splice(action.payload, 1);
    },
    
    // setResume - stores the uploaded resume file or metadata
    // Payload should be a File object or metadata about the resume
    setResume: (state, action) => {
      // Store resume data in state
      state.resume = action.payload;
    },
    
    // addCertificate - adds a certificate file to the certificates array
    // Payload should be a File object or certificate metadata
    addCertificate: (state, action) => {
      // Add new certificate to the end of certificates array
      state.certificates.push(action.payload);
    },
    
    // removeCertificate - removes a certificate at specific index
    // Payload should be the index number of the certificate to remove
    removeCertificate: (state, action) => {
      // Remove 1 element at the index specified in payload
      state.certificates.splice(action.payload, 1);
    },
  },
});

// Export all action creators for use in components
// These can be dispatched to update the user state
export const { 
  setUserSkills,      // dispatch(setUserSkills(['skill1', 'skill2']))
  addUserSkill,       // dispatch(addUserSkill('New Skill'))
  setRequiredSkills,  // dispatch(setRequiredSkills(['required1', 'required2']))
  addExperience,      // dispatch(addExperience({ role: 'Developer', company: 'ABC' }))
  removeExperience,   // dispatch(removeExperience(0)) - removes first experience
  setResume,          // dispatch(setResume(fileObject))
  addCertificate,     // dispatch(addCertificate(fileObject))
  removeCertificate   // dispatch(removeCertificate(0)) - removes first certificate
} = userSlice.actions;

// Export the reducer - this is added to the store in store/index.js
export default userSlice.reducer;
