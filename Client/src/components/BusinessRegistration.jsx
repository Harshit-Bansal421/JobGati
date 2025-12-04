// ============================================
// IMPORTS
// ============================================

// Import React and the useState hook for managing component state
import React, { useState } from 'react';

// Import useNavigate hook for programmatic navigation between routes
import { useNavigate } from 'react-router-dom';

// Import Redux hooks: useSelector to read state, useDispatch to send actions
import { useSelector, useDispatch } from 'react-redux';

// Import action to update required skills in the Redux user slice
import { setRequiredSkills } from '../store/slices/userSlice';

// Import action to log in the user/business in the Redux auth slice
import { login } from '../store/slices/authSlice';

// ============================================
// BUSINESS REGISTRATION COMPONENT
// ============================================
// This component renders a registration form for businesses to sign up
// It collects business information, job positions, and required skills

const BusinessRegistration = () => {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  
  // State to hold the current skill being typed (before adding to the skills list)
  const [newRequiredSkill, setNewRequiredSkill] = useState("");
  
  // State object to hold all form field values
  // Default values are empty strings
  const [formData, setFormData] = useState({
    businessName: "",      // Name of the business
    industry: "",          // Industry sector the business operates in
    location: "",          // Physical location of the business
    contactPerson: "",     // Main contact person for the business
    jobPositions: ""       // Description of job positions available
  });
  
  // State to hold error messages for validation feedback
  const [error, setError] = useState("");

  // ============================================
  // HOOKS FOR ROUTING AND REDUX
  // ============================================
  
  // Hook to allow programmatic navigation (e.g., to dashboard after registration)
  const navigate = useNavigate();
  
  // Hook to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // ============================================
  // REDUX STATE SELECTORS
  // ============================================
  
  // Extract current language and translations from the language Redux slice
  const { currentLanguage, translations } = useSelector((state) => state.language);
  
  // Extract the list of required skills from the user Redux slice
  const { requiredSkills } = useSelector((state) => state.user);
  
  // Get the translation object for the current language
  // Falls back to empty object if translations not available
  const t = translations[currentLanguage] || {};

  // ============================================
  // EVENT HANDLERS
  // ============================================
  
  /**
   * Handles changes to all form input fields
   * Maps HTML element IDs (kebab-case) to state keys (camelCase)
   * @param {Event} e - The input change event
   */
  const handleInputChange = (e) => {
    // Destructure the id and value from the input element
    const { id, value } = e.target;
    
    // Map HTML element IDs to formData state keys
    // This allows us to use kebab-case IDs in HTML while maintaining camelCase in state
    const keyMap = {
      "business-name": "businessName",
      "industry": "industry",
      "location": "location",
      "contact-person": "contactPerson",
      "job-positions": "jobPositions"
    };
    
    // Get the corresponding state key, or use the id as-is if no mapping exists
    const stateKey = keyMap[id] || id;
    
    // Update formData state by spreading the previous state and updating the specific field
    setFormData(prev => ({ ...prev, [stateKey]: value }));
    
    // Clear any existing error message when user starts typing
    if (error) setError("");
  };

  /**
   * Handles adding a new skill to the required skills list
   * Triggered when user presses Enter in the skills input field
   * @param {KeyboardEvent} e - The keyboard event
   */
  const handleAddRequiredSkill = (e) => {
    // Check if Enter key was pressed and the input has non-whitespace content
    if (e.key === "Enter" && newRequiredSkill.trim()) {
      // Dispatch action to Redux store to add the new skill to the existing skills array
      // trim() removes any leading/trailing whitespace
      dispatch(setRequiredSkills([...requiredSkills, newRequiredSkill.trim()]));
      
      // Clear the input field after adding the skill
      setNewRequiredSkill("");
    }
  };

  /**
   * Handles removing a skill from the required skills list
   * @param {number} index - The index of the skill to remove
   */
  const handleRemoveRequiredSkill = (index) => {
    // Create a copy of the requiredSkills array to avoid mutating state directly
    const updatedSkills = [...requiredSkills];
    
    // Remove one element at the specified index
    updatedSkills.splice(index, 1);
    
    // Dispatch the updated skills array to Redux store
    dispatch(setRequiredSkills(updatedSkills));
  };

  /**
   * Handles the business registration submission
   * Validates all required fields before proceeding
   * Currently simulates registration (not connected to real backend)
   */
  const handleRegisterBusiness = async () => {
    // ============================================
    // VALIDATION CHECKS
    // ============================================
    
    // Check if all basic business information fields are filled
    if (!formData.businessName || !formData.industry || !formData.location || !formData.contactPerson) {
      setError("Please fill in all business information fields.");
      return; // Exit early if validation fails
    }
    
    // Check if job positions description is provided
    if (!formData.jobPositions) {
      setError("Please describe the job positions.");
      return; // Exit early if validation fails
    }
    
    // Check if at least one required skill has been added
    if (requiredSkills.length === 0) {
      setError("Please add at least one required skill.");
      return; // Exit early if validation fails
    }

    // ============================================
    // REGISTRATION LOGIC (SIMULATED)
    // ============================================
    
    // Dispatch login action to Redux store with business name and role
    // This simulates a successful registration by logging in the business
    dispatch(login({ name: formData.businessName, role: "business" }));
    
    // Show success message to the user
    alert("Business registered!");
    
    // Navigate to the dashboard page
    navigate("/dashboard");
  };

  // ============================================
  // EARLY RETURN CHECK
  // ============================================
  
  // If translations for forms are not loaded yet, don't render the component
  // This prevents errors when trying to access translation keys
  if (!t.forms) return null;

  // ============================================
  // JSX RENDER
  // ============================================
  
  return (
    // Main section container with vertical padding
    <section className="py-20">
      {/* Container with auto margins for centering and horizontal padding */}
      <div className="container mx-auto px-5">
        {/* Form wrapper: centered, max-width, white background with shadow */}
        <div className="max-w-[800px] mx-auto bg-white rounded-lg p-6 md:p-8 lg:p-10 shadow-sm">
          
          {/* Page heading - displays translated form title */}
          <h2 className="text-3xl font-bold mb-8 text-center">{t.forms.businessReg}</h2>
          
          {/* ERROR MESSAGE DISPLAY */}
          {/* Conditionally rendered only if there's an error */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 text-center" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* MAIN FORM GRID */}
          {/* Two-column layout on medium+ screens, single column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            
            {/* ======================================== */}
            {/* LEFT COLUMN - Basic Business Information */}
            {/* ======================================== */}
            <div>
              
              {/* BUSINESS NAME INPUT */}
              <div className="mb-5">
                <label htmlFor="business-name" className="block mb-2 font-medium">
                  {t.forms.businessName}
                </label>
                <input 
                  type="text" 
                  id="business-name" 
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100" 
                />
              </div>
              
              {/* INDUSTRY DROPDOWN */}
              <div className="mb-5">
                <label htmlFor="industry" className="block mb-2 font-medium">
                  {t.forms.industry}
                </label>
                <select 
                  id="industry" 
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                >
                  {/* Default placeholder option */}
                  <option value="">Select Industry</option>
                  
                  {/* Dynamically render industry options from translations */}
                  {t.forms.industryOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              {/* LOCATION INPUT */}
              <div className="mb-5">
                <label htmlFor="location" className="block mb-2 font-medium">
                  {t.forms.location}
                </label>
                <input 
                  type="text" 
                  id="location" 
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100" 
                />
              </div>
              
              {/* CONTACT PERSON INPUT */}
              <div className="mb-5">
                <label htmlFor="contact-person" className="block mb-2 font-medium">
                  {t.forms.contactPerson}
                </label>
                <input 
                  type="text" 
                  id="contact-person" 
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100" 
                />
              </div>
              
              {/* ACTION BUTTONS */}
              <div className="mb-5">
                {/* REGISTER BUTTON - Primary action */}
                <button
                  className="bg-primary text-white hover:bg-blue-600 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300"
                  onClick={handleRegisterBusiness}
                >
                  {t.forms.registerBusiness}
                </button>
                
                {/* LOGIN BUTTON - Secondary action for existing users */}
                <button
                  onClick={() => navigate('/login')}
                  className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300 ml-2.5"
                >
                  {t.forms.login}
                </button>
              </div>
            </div>
            
            {/* ======================================== */}
            {/* RIGHT COLUMN - Job Positions & Skills */}
            {/* ======================================== */}
            <div>
              
              {/* JOB POSITIONS TEXTAREA */}
              <div className="mb-5 col-span-1 md:col-span-2">
                <label htmlFor="job-positions" className="block mb-2 font-medium">
                  {t.forms.jobPositions}
                </label>
                <textarea
                  id="job-positions"
                  rows="4"
                  value={formData.jobPositions}
                  onChange={handleInputChange}
                  placeholder={t.forms.jobPositionsPlaceholder}
                  className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                ></textarea>
              </div>
              
              {/* REQUIRED SKILLS SECTION */}
              <div className="mb-5">
                <label htmlFor="required-skills" className="block mb-2 font-medium">
                  {t.forms.requiredSkills}
                </label>
                
                {/* Input field to add new skills (press Enter to add) */}
                <input
                  type="text"
                  id="required-skills"
                  placeholder={t.forms.requiredSkillsPlaceholder}
                  value={newRequiredSkill}
                  onChange={(e) => setNewRequiredSkill(e.target.value)}
                  onKeyPress={handleAddRequiredSkill}
                  className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                />
                
                {/* SKILLS DISPLAY - Shows all added skills as chips/tags */}
                <div className="flex flex-wrap gap-2.5 mt-5">
                  {/* Map through each skill and render as a chip */}
                  {requiredSkills.map((skill, index) => (
                    <span key={index} className="bg-blue-50 text-primary px-3 py-1 rounded-[20px] text-sm font-medium">
                      {/* Display the skill name */}
                      {skill}
                      
                      {/* Remove button (× symbol) - clickable to delete the skill */}
                      <span
                        className="ml-1.5 cursor-pointer"
                        onClick={() => handleRemoveRequiredSkill(index)}
                      >
                        ×
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// EXPORT
// ============================================
// Export the component as default for use in other parts of the application
export default BusinessRegistration;
