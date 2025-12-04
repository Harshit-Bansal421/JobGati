/**
 * SkillAnalysis Component - Skill Assessment Feature
 * 
 * This component allows users to analyze their skills against market requirements.
 * It simulates an API call to fetch required skills and compares them with user's current skills.
 * Part of the JobGati landing page features.
 */

// Import React and useState hook for managing analysis results
import React, { useState } from 'react';

/**
 * SkillAnalysis functional component
 * @param {Object} t - Translation object containing localized text
 * @param {Array} userSkills - Array of user's current skills from Redux state
 */
const SkillAnalysis = ({ t, userSkills }) => {
  // State to store analysis results (null initially, object after analysis)
  const [analysisResult, setAnalysisResult] = useState(null);

  /**
   * handleAnalyze - Initiates skill analysis
   * Simulates an API call to analyze user skills against market requirements
   * In production, this would call a real backend API at /api/ai/skill-analysis
   */
  const handleAnalyze = async () => {
    // Simulate API call with setTimeout (mock data)
    // In real app: const res = await fetch("http://localhost:4000/api/ai/skill-analysis", ...);
    // For demo, we'll mock the response
    setTimeout(() => {
        // Set mock analysis result after 1 second delay
        setAnalysisResult({
            requiredSkills: ["Welding L3", "Solar Installation L2", "Electrical Safety L1"], // Mock required skills
            userSkills: userSkills // Copy of user's current skills from props
        });
    }, 1000); // 1 second delay to simulate network request
  };

  // Render the skill analysis section
  return (
    // Main container - white background with vertical padding
    <div className="bg-white py-16">
      {/* Content wrapper - max width container with horizontal padding */}
      <div className="max-w-[1000px] mx-auto px-5">
        {/* Section header - centered text */}
        <div className="text-center mb-10">
          {/* Section title - large, bold, dark text */}
          <h2 className="text-3xl font-bold mb-4 text-dark">{t.title}</h2>
          {/* Section description - gray text with max width for readability */}
          <p className="text-lg text-gray-500 max-w-[600px] mx-auto">{t.description}</p>
        </div>
        
        {/* Analysis action container - light gray background with rounded corners */}
        <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
          {/* Analyze button - primary blue color with hover effect */}
          <button className="bg-primary text-white hover:bg-blue-600 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300" onClick={handleAnalyze}>
            {t.analyzeBtn} {/* Button text from translations */}
          </button>

          {/* Results section - only shown if analysisResult exists (after button click) */}
          {analysisResult && (
            // Results container - white background with shadow
            <div className="bg-white rounded-lg p-5 mt-5 shadow-sm">
              {/* Results heading */}
              <h3 className="text-xl mb-4 text-dark font-bold">{t.resultTitle}</h3>

              {/* Required Skills section */}
              <div>
                {/* Subheading for required skills */}
                <h4 className="text-lg font-semibold mb-2">{t.requiredSkills}</h4>
                {/* Skill pills container - flexbox with wrapping */}
                <div className="flex flex-wrap gap-2.5 my-4">
                  {/* Map through required skills and render each as a pill */}
                  {analysisResult.requiredSkills.map((skill, index) => (
                    // Skill pill - blue background with rounded corners
                    <div key={index} className="bg-blue-50 text-primary px-4 py-2 rounded-[20px] text-sm font-medium">
                      {skill} {/* Skill name */}
                    </div>
                  ))}
                </div>
              </div>

              {/* User's Current Skills section */}
              <div>
                {/* Subheading for user's skills */}
                <h4 className="text-lg font-semibold mb-2">{t.yourSkills}</h4>
                {/* Skill pills container - flexbox with wrapping */}
                <div className="flex flex-wrap gap-2.5 my-4">
                  {/* Map through user's skills and render each as a pill */}
                  {analysisResult.userSkills.map((skill, index) => (
                    // Skill pill - blue background with rounded corners (same style as required skills)
                    <div key={index} className="bg-blue-50 text-primary px-4 py-2 rounded-[20px] text-sm font-medium">
                      {skill} {/* Skill name */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Export SkillAnalysis component as default export
export default SkillAnalysis;
