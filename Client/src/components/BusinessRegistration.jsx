import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../store/slices/authSlice";
import "./../index.css";
import { createBusiness } from "../services/BusinessServices";

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
    businessName: "", // Name of the business
    industry: "", // Industry sector the business operates in
    location: "", // Physical location of the business
    contactPerson: "", // Main contact person for the business
    jobPositions: "", // Description of job positions available
    ExpectedSalary: "", // Expected salary for the job
    requiredSkills: [],

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
  const { currentLanguage, translations } = useSelector(
    (state) => state.language
  );

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

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
      industry: "industry",
      location: "location",
      "contact-person": "contactPerson",
      "job-positions": "jobPositions",
      "expected-salary": "ExpectedSalary",
    };

    // Get the corresponding state key, or use the id as-is if no mapping exists
    const stateKey = keyMap[id] || id;

    // Update formData state by spreading the previous state and updating the specific field
    setFormData((prev) => ({ ...prev, [stateKey]: value }));

    // Clear any existing error message when user starts typing
    if (error) setError("");
  };

  const handleAddRequiredSkill = (e) => {
    if (e.key === "Enter" && newRequiredSkill.trim()) {
      setFormData((prev) => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, newRequiredSkill.trim()],
      }));
      setNewRequiredSkill("");
      e.preventDefault();
    }
  };

  /**
   * Handles removing a skill from the required skills list
   * @param {number} index - The index of the skill to remove
   */
  const handleRemoveRequiredSkill = (index) => {
    setFormData((prev) => {
      const arr = [...prev.requiredSkills];
      arr.splice(index, 1);
      return { ...prev, requiredSkills: arr };
    });
  };

  if (!t.forms) return null;

  // ============================================
  // JSX RENDER
  // ============================================

  const finalRegisterBusiness = () => {
    if (
      !formData.businessName ||
      !formData.industry ||
      !formData.location ||
      formData.contactPerson.length !== 10
    ) {
      setError("Please fill in all business information fields correctly.");
      return;
    }

    const payload = {
      ...formData,
      contactPerson: Number(formData.contactPerson),
      ExpectedSalary: Number(formData.ExpectedSalary),
      jobPositions: formData.jobPositions
        ? formData.jobPositions.split(",").map((p) => p.trim())
        : [],
    };

    console.log("FINAL PAYLOAD:", payload);


    // isLoggedIn ? createBusiness(payload) : alert("error")
    dispatch(register({ data: payload, type: "business" }));
    navigate("/login");
  };


  return (
    // Main section container with vertical padding
    <section className="py-20 dark:bg-gray-900">
      {/* Container with auto margins for centering and horizontal padding */}
      <div className="container mx-auto px-5">
        {/* Form wrapper: centered, max-width, white background with shadow */}
        <div className="max-w-[800px] mx-auto bg-white rounded-lg p-6 md:p-8 lg:p-10 shadow-sm dark:bg-gray-800">
          {/* Page heading - displays translated form title */}
          <h2 className="text-3xl font-bold mb-8 text-center dark:text-gray-200 dark:border-gray-600">
            {t.forms.businessReg}
          </h2>

          {/* ERROR MESSAGE DISPLAY */}
          {/* Conditionally rendered only if there's an error */}
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 text-center"
              role="alert"
            >
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
                <label
                  htmlFor="business-name"
                  className="block mb-2 font-medium dark:text-gray-200"
                >
                  {t.forms.businessName}
                </label>
                <input
                  type="text"
                  id="business-name"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 dark:text-gray-200"
                />
              </div>

              {/* INDUSTRY DROPDOWN */}
              <div className="mb-5">
                <label
                  htmlFor="industry"
                  className="block mb-2 font-medium  dark:text-gray-200"
                >
                  {t.forms.industry}
                </label>
                <select
                  id="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 dark:text-gray-200"
                >
                  {/* Default placeholder option */}
                  <option value="">Select Industry</option>

                  {/* Dynamically render industry options from translations */}
                  {t.forms.industryOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                      onClick={handleInputChange}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* LOCATION INPUT */}
              <div className="mb-5">
                <label
                  htmlFor="location"
                  className="block mb-2 font-medium  dark:text-gray-200"
                >
                  {t.forms.location}
                </label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 dark:text-gray-200"
                />
              </div>

              {/* CONTACT PERSON INPUT */}
              <div className="mb-5">
                <label
                  htmlFor="contact-person"
                  className="block mb-2 font-medium  dark:text-gray-200"
                >
                  {t.forms.contactPerson}
                </label>
                <input
                  type="number"
                  id="contact-person"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 no-spinner dark:text-gray-200"
                />
              </div>

            </div>

            {/* ======================================== */}
            {/* RIGHT COLUMN - Job Positions & Skills */}
            {/* ======================================== */}
            <div>
              {/* JOB POSITIONS TEXTAREA */}
              <div className="mb-5 col-span-1 md:col-span-2  dark:text-gray-200">
                <label
                  htmlFor="job-positions"
                  className="block mb-2 font-medium"
                >
                  {t.forms.jobPositions}
                </label>
                <textarea
                  id="job-positions"
                  rows="4"
                  value={formData.jobPositions}
                  onChange={handleInputChange}
                  placeholder={t.forms.jobPositionsPlaceholder}
                  className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 resize-none  dark:text-gray-200"
                ></textarea>
              </div>

              {/* Expected salary input*/}
              <div className="mb-5">
                <label
                  htmlFor="expected-salary"
                  className="block mb-2 font-medium  dark:text-gray-200"
                >
                  {t.forms.ExpectedSalary}
                </label>
                <input
                  type="number"
                  id="expected-salary"
                  value={formData.ExpectedSalary}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 no-spinner dark:text-gray-200"
                />
              </div>

              {/* REQUIRED SKILLS SECTION */}
              <div className="mb-5">
                <label
                  htmlFor="required-skills"
                  className="block mb-2 font-medium  dark:text-gray-200"
                >
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
                  className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100  dark:text-gray-200"
                />

                {/* SKILLS DISPLAY - Shows all added skills as chips/tags */}
                <div className="flex flex-wrap gap-2.5 mt-5">
                  {/* Map through each skill and render as a chip */}
                  {formData.requiredSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-primary px-3 py-1 rounded-[20px] text-sm font-medium"
                    >
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
          {/* ACTION BUTTONS */}
          <div className="mb-5 w-full flex justify-center">
            {/* REGISTER BUTTON - Primary action */}
            <button
              className="bg-primary text-white hover:bg-blue-600 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300"
              onClick={finalRegisterBusiness}
            >
              {t.forms.registerBusiness}
            </button>
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
