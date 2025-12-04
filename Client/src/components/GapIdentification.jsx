/**
 * GapIdentification Component - Skill Gap Analysis Feature
 * 
 * This component identifies gaps between user's current skills and market requirements.
 * It displays a percentage score and lists missing skills that need to be acquired.
 * Uses a circular progress indicator to visualize the skill match percentage.
 */

// Import React and useState hook for managing gap analysis results
import React, { useState } from 'react';

/**
 * GapIdentification functional component
 * @param {Object} t - Translation object containing localized text
 * @param {Array} userSkills - Array of user's current skills from Redux state
 */
const GapIdentification = ({ t, userSkills }) => {
  // State to store gap identification results (null initially, object after analysis)
  const [gapResult, setGapResult] = useState(null);

  /**
   * handleIdentify - Initiates skill gap identification
   * Simulates an API call to calculate skill gap score and identify missing skills
   * In production, this would call a real backend API endpoint
   */
  const handleIdentify = async () => {
    // Simulate API call with setTimeout (mock data)
    setTimeout(() => {
        // Set mock gap result after 1 second delay
        setGapResult({
            score: 70,  // Percentage score indicating skill match (70% match)
            missingSkills: ["Welding L3", "Solar Installation L2"] // Skills user needs to acquire
        });
    }, 1000); // 1 second delay to simulate network request
  };

  // Render the gap identification section
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
          {/* Identify button - primary blue color with hover effect */}
          <button className="bg-primary text-white hover:bg-blue-600 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300" onClick={handleIdentify}>
            {t.identifyBtn} {/* Button text from translations */}
          </button>
          
          {/* Results section - only shown if gapResult exists (after button click) */}
          {gapResult && (
            // Results container - white background with shadow
            <div className="bg-white rounded-lg p-5 mt-5 shadow-sm">
              {/* Results heading */}
              <h3 className="text-xl mb-4 text-dark font-bold">{t.resultTitle}</h3>

              {/* Circular progress indicator section */}
              <div className="text-center my-8">
                {/* Circular progress container
                    Using conic-gradient to create a circular progress indicator:
                    - Primary color fills 70% (score percentage)
                    - Light gray fills remaining 30%
                    - ::before pseudo-element creates white inner circle to show ring effect */}
                <div className="w-[120px] h-[120px] rounded-full bg-[conic-gradient(var(--color-primary)_70%,#e5e7eb_0)] flex items-center justify-center mx-auto mb-5 relative before:content-[''] before:absolute before:w-[90px] before:h-[90px] before:rounded-full before:bg-white">
                  {/* Score text - centered inside the circular progress */}
                  <div className="relative z-10 text-2xl font-bold text-primary">{gapResult.score}%</div>
                </div>
                {/* Label for the score */}
                <h4 className="text-lg font-semibold">{t.gapScore}</h4>
              </div>

              {/* Missing Skills section */}
              <div>
                {/* Subheading for missing skills */}
                <h4 className="text-lg font-semibold mb-2">{t.missingSkills}</h4>
                {/* Skill pills container - flexbox with wrapping */}
                <div className="flex flex-wrap gap-2.5 my-4">
                  {/* Map through missing skills and render each as a pill */}
                  {gapResult.missingSkills.map((skill, index) => (
                    // Skill pill - red background to indicate missing/gap
                    <div key={index} className="bg-red-50 text-danger px-4 py-2 rounded-[20px] text-sm font-medium">
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

// Export GapIdentification component as default export
export default GapIdentification;
