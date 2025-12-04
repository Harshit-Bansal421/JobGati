/**
 * TrainingBridge Component - Training & Education Recommendations
 * 
 * This component helps users find relevant training courses and nearby training centers.
 * It displays both online micro-courses and physical training center locations.
 * Part of the JobGati skill development journey.
 */

// Import React and useState hook for managing training results
import React, { useState } from 'react';

/**
 * TrainingBridge functional component
 * @param {Object} t - Translation object containing localized text
 * @param {Function} onFindTraining - Optional callback when training is found
 */
const TrainingBridge = ({ t, onFindTraining }) => {
  // State to store training search results (null initially, object after search)
  const [trainingResult, setTrainingResult] = useState(null);

  /**
   * handleFindTraining - Initiates training search
   * Simulates an API call to find training courses and centers
   * In production, this would call a real backend API with user's skill gaps
   */
  const handleFindTraining = () => {
    // Simulate API call to find training
    setTimeout(() => {
      // Set mock training results after 1.5 second delay
      setTrainingResult({
        // Array of online micro-courses
        microCourses: [
          {
            name: "Advanced Welding Techniques",
            provider: "SkillIndia",      // Government skill training provider
            duration: "4 weeks",           // Course duration
            format: "Online",              // Online course
          },
          {
            name: "Digital Literacy for Workers",
            provider: "NPTEL",             // National online learning platform
            duration: "6 weeks",
            format: "Online",
          },
          {
            name: "Solar Panel Installation",
            provider: "NSDC",              // National Skill Development Corporation
            duration: "8 weeks",
            format: "Blended",             // Mix of online and offline learning
          },
        ],
        // Array of nearby physical training centers
        trainingCenters: [
          {
            name: "ITI Center Delhi",
            distance: "2.5 km",            // Distance from user's location
            courses: ["Welding L3", "Solar Installation"], // Available courses
          },
          {
            name: "Skill Development Hub",
            distance: "5 km",
            courses: ["Digital Literacy", "Safety Training"],
          },
          {
            name: "Vocational Training Institute",
            distance: "7 km",
            courses: ["Welding L3", "Electrical Safety"],
          },
        ],
      });
      // Call optional callback if provided
      if (onFindTraining) onFindTraining();
    }, 1500); // 1.5 second delay to simulate network request
  };

  // Render the training bridge section
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
        
        {/* Training search action container - light gray background with rounded corners */}
        <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
          {/* Find Training button - primary blue color with hover effect */}
          <button
            className="bg-primary text-white hover:bg-blue-600 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300"
            onClick={handleFindTraining}
          >
            {t.findTrainingBtn} {/* Button text from translations */}
          </button>

          {/* Results section - only shown if trainingResult exists (after button click) */}
          {trainingResult && (
            // Results container - white background with shadow
            <div className="bg-white rounded-lg p-5 mt-5 shadow-sm">
              {/* Results heading */}
              <h3 className="text-xl mb-4 text-dark font-bold">{t.resultTitle}</h3>

              {/* Micro-Courses section */}
              <div>
                {/* Subheading for online courses */}
                <h4 className="text-lg font-semibold mb-2">{t.microCourses}</h4>
                {/* Course cards grid - responsive grid that adapts to screen size */}
                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 mt-5">
                  {/* Map through micro-courses and render each as a card */}
                  {trainingResult.microCourses.map((course, index) => (
                    // Course card - white background with shadow and hover lift effect
                    <div key={index} className="bg-white rounded-lg p-5 shadow-md transition-transform duration-300 hover:-translate-y-1 border border-gray-100">
                      {/* Course name - large, bold, dark text */}
                      <h4 className="text-lg mb-2.5 text-dark font-bold">{course.name}</h4>
                      
                      {/* Provider name - small gray text with bold label */}
                      <p className="text-sm text-gray-500 mb-4">
                        <strong>Provider:</strong> {course.provider}
                      </p>
                      
                      {/* Course duration - small gray text with bold label */}
                      <p className="text-sm text-gray-500 mb-4">
                        <strong>Duration:</strong> {course.duration}
                      </p>
                      
                      {/* Course format (Online/Offline/Blended) - small gray text with bold label */}
                      <p className="text-sm text-gray-500 mb-4">
                        <strong>Format:</strong> {course.format}
                      </p>
                      
                      {/* Enroll button - outlined style that fills on hover */}
                      <button
                        className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300 mt-2.5"
                      >
                        Enroll {/* In production, would navigate to course enrollment page */}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Training Centers section */}
              <div className="mt-8">
                {/* Subheading for physical training centers */}
                <h4 className="text-lg font-semibold mb-2">{t.trainingCenters}</h4>
                {/* Center cards grid - responsive grid that adapts to screen size */}
                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 mt-5">
                  {/* Map through training centers and render each as a card */}
                  {trainingResult.trainingCenters.map((center, index) => (
                    // Center card - white background with shadow and hover lift effect
                    <div key={index} className="bg-white rounded-lg p-5 shadow-md transition-transform duration-300 hover:-translate-y-1 border border-gray-100">
                      {/* Center name - large, bold, dark text */}
                      <h4 className="text-lg mb-2.5 text-dark font-bold">{center.name}</h4>
                      
                      {/* Distance from user - small gray text with bold label */}
                      <p className="text-sm text-gray-500 mb-4">
                        <strong>Distance:</strong> {center.distance}
                      </p>
                      
                      {/* Available courses - comma-separated list with bold label */}
                      <p className="text-sm text-gray-500 mb-4">
                        <strong>Courses:</strong>{" "}
                        {center.courses.join(", ")} {/* Convert array to comma-separated string */}
                      </p>
                      
                      {/* View Details button - outlined style that fills on hover */}
                      <button
                        className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300 mt-2.5"
                      >
                        View Details {/* In production, would show center details/map */}
                      </button>
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

// Export TrainingBridge component as default export
export default TrainingBridge;
