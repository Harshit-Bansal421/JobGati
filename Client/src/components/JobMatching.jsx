/**
 * JobMatching Component - AI-Powered Job Recommendations
 * 
 * This component displays job opportunities matched to the user's skills.
 * Each job shows a match percentage, company details, location, and required skills.
 * Users can apply to jobs directly from this interface.
 */

// Import React and useState hook for managing job search results
import React, { useState } from 'react';

/**
 * JobMatching functional component
 * @param {Object} t - Translation object containing localized text
 * @param {Array} userSkills - Array of user's current skills from Redux state
 */
const JobMatching = ({ t, userSkills }) => {
  // State to store job matching results (null initially, object with jobs array after search)
  const [jobsResult, setJobsResult] = useState(null);

  /**
   * handleFindJobs - Initiates job search and matching
   * Simulates an API call to find jobs that match user's skills
   * In production, this would call a real backend API with AI-powered matching
   */
  const handleFindJobs = async () => {
    // Simulate API call with setTimeout (mock data)
    setTimeout(() => {
        // Set mock job results after 1 second delay
        setJobsResult({
            jobs: [
                {
                    match: 95,  // 95% match with user's skills
                    title: "Senior Welder",
                    company: "BuildRight Construction",
                    location: "New Delhi",
                    skills: ["Welding L3", "Safety L2"] // Required skills for this job
                },
                {
                    match: 80,  // 80% match with user's skills
                    title: "Solar Technician Assistant",
                    company: "Green Energy Sol",
                    location: "Noida",
                    skills: ["Solar Installation L1", "Electrical Basics"] // Required skills for this job
                }
            ]
        });
    }, 1000); // 1 second delay to simulate network request
  };

  // Render the job matching section
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
        
        {/* Job search action container - light gray background with rounded corners */}
        <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
          {/* Find Jobs button - primary blue color with hover effect */}
          <button className="bg-primary text-white hover:bg-blue-600 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300" onClick={handleFindJobs}>
            {t.findJobsBtn} {/* Button text from translations */}
          </button>

          {/* Results section - only shown if jobsResult exists (after button click) */}
          {jobsResult && (
            // Results container - white background with shadow
            <div className="bg-white rounded-lg p-5 mt-5 shadow-sm">
              {/* Results heading */}
              <h3 className="text-xl mb-4 text-dark font-bold">{t.resultTitle}</h3>

              {/* Job cards grid - responsive grid that adapts to screen size
                  - auto-fit creates as many columns as possible
                  - minmax(300px, 1fr) ensures each card is at least 300px wide */}
              <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 mt-5">
                {/* Map through jobs array and render each job as a card */}
                {jobsResult.jobs.map((job, index) => (
                  // Job card - white background with shadow and left border accent
                  <div key={index} className="bg-white rounded-lg p-5 shadow-md border-l-4 border-primary">
                    {/* Match percentage - large, bold, primary color */}
                    <div className="text-2xl font-bold text-primary mb-2.5">{job.match}%</div>
                    
                    {/* Job title - large, bold, dark text */}
                    <h4 className="text-lg mb-2.5 text-dark font-bold">{job.title}</h4>
                    
                    {/* Company name - small gray text with bold label */}
                    <p className="text-sm text-gray-500 mb-4">
                      <strong>Company:</strong> {job.company}
                    </p>
                    
                    {/* Location - small gray text with bold label */}
                    <p className="text-sm text-gray-500 mb-4">
                      <strong>Location:</strong> {job.location}
                    </p>
                    
                    {/* Required skills - comma-separated list with bold label */}
                    <p className="text-sm text-gray-500 mb-4">
                      <strong>Required Skills:</strong>{" "}
                      {job.skills.join(", ")} {/* Convert skills array to comma-separated string */}
                    </p>
                    
                    {/* Apply Now button - primary blue color with hover effect */}
                    <button
                      className="bg-primary text-white hover:bg-blue-600 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300 mt-2.5"
                    >
                      Apply Now {/* In production, this would navigate to application page */}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Export JobMatching component as default export
export default JobMatching;
