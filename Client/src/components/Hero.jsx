/**
 * Hero Component - Landing Page Banner
 * 
 * This is the main hero section of the landing page that greets visitors.
 * Features a title, description, CTA buttons, and 4 feature icons representing
 * the JobGati journey: Skill Analysis, Gap Identification, Training, and Job Matching.
 */

// Import React library
import React from 'react';

// Import useNavigate for programmatic navigation
import { useNavigate } from 'react-router-dom';

// Import useSelector to access Redux state
import { useSelector } from 'react-redux';

/**
 * Hero functional component
 * @param {Function} handleSectionClick - Callback to scroll to specific sections
 */
const Hero = ({ handleSectionClick }) => {
  // Get navigate function for route navigation
  const navigate = useNavigate();
  
  // Access translations and current language from Redux store
  const { currentLanguage, translations } = useSelector((state) => state.language);
  
  // Extract translations for current language with fallback to empty object
  const t = translations[currentLanguage] || {};

  // Guard clause: Return null if hero translations aren't loaded yet
  // HomePage handles loading, so this should rarely execute
  if (!t.hero) return null;

  // Render the hero section
  return (
    // Hero section - full-width banner with gradient background
    // Gradient from light blue to lighter blue in light mode
    // Gradient from dark gray to darker gray in dark mode
    <section className="py-20 bg-gradient-to-br from-[#f0f9ff] to-[#e1f5fe] dark:from-gray-800 dark:to-gray-900 transition-colors">
      {/* Content wrapper - max width container with horizontal padding */}
      <div className="container mx-auto px-5">
        {/* Two-column layout - stacks vertically on mobile, side-by-side on desktop */}
        <div className="flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
          {/* Left column - text content and CTA buttons */}
          <div className="flex-1">
            {/* Main heading - dangerouslySetInnerHTML allows HTML in translation (e.g., <span> for styling) */}
            <h1
              className="text-5xl font-extrabold leading-tight mb-5 text-dark dark:text-white"
              dangerouslySetInnerHTML={{ __html: t.hero.title }}
            ></h1>
            
            {/* Hero description - gray text for contrast */}
            <p className="text-lg text-gray-500 dark:text-gray-300 mb-8">{t.hero.description}</p>
            
            {/* CTA buttons container - centered on mobile, left-aligned on desktop */}
            <div className="flex gap-4 justify-center md:justify-start">
              {/* Job Seeker CTA button - orange/secondary color */}
              <button
                className="bg-secondary text-white hover:bg-orange-600 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300"
                onClick={() => navigate("/register-seeker")}  // Navigate to job seeker registration
              >
                {t.hero.jobSeekerBtn}  {/* Button text from translations */}
              </button>
              
              {/* Business CTA button - blue/primary color */}
              <button
                className="bg-primary text-white hover:bg-blue-600 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300"
                onClick={() => navigate("/register-business")}  // Navigate to business registration
              >
                {t.hero.businessBtn}  {/* Button text from translations */}
              </button>
            </div>
          </div>
          
          {/* Right column - feature icons grid */}
          <div className="flex-1 flex justify-center items-center w-full">
            {/* Responsive grid - 2 columns on mobile, 4 columns on medium+ screens */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 lg:gap-6 w-full mx-auto justify-items-center">
              
              {/* Feature 1: Skill Analysis */}
              <div className="flex flex-col items-center text-center max-w-[120px]">
                {/* Circular icon container - clickable, scrolls to skill-analysis section */}
                <div
                  className="w-[70px] h-[70px] rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-lg mb-2.5 cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl text-[#3B82F6] dark:text-blue-400"
                  onClick={() => handleSectionClick("skill-analysis")}
                >
                  {/* Bar chart SVG icon representing skill analysis */}
                  <svg
                    className="w-[30px] h-[30px]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14"
                    ></path>
                  </svg>
                </div>
                {/* Feature label - step 1 text from translations */}
                <div className="text-sm font-medium dark:text-gray-200">{t.features.step1}</div>
              </div>
              
              {/* Feature 2: Gap Identification */}
              <div className="flex flex-col items-center text-center max-w-[120px]">
                {/* Circular icon container - orange color, scrolls to gap-identification section */}
                <div
                  className="w-[70px] h-[70px] rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-lg mb-2.5 cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl text-[#F97316] dark:text-orange-400"
                  onClick={() => handleSectionClick("gap-identification")}
                >
                  {/* Shield with checkmark SVG icon representing verification/gap analysis */}
                  <svg
                    className="w-[30px] h-[30px]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    ></path>
                  </svg>
                </div>
                {/* Feature label - step 2 text from translations */}
                <div className="text-sm font-medium dark:text-gray-200">{t.features.step2}</div>
              </div>
              
              {/* Feature 3: Training Bridge */}
              <div className="flex flex-col items-center text-center max-w-[120px]">
                {/* Circular icon container - green color, scrolls to training-bridge section */}
                <div
                  className="w-[70px] h-[70px] rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-lg mb-2.5 cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl text-[#10B981] dark:text-green-400"
                  onClick={() => handleSectionClick("training-bridge")}
                >
                  {/* Open book SVG icon representing training/education */}
                  <svg
                    className="w-[30px] h-[30px]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    ></path>
                  </svg>
                </div>
                {/* Feature label - step 3 text from translations */}
                <div className="text-sm font-medium dark:text-gray-200">{t.features.step3}</div>
              </div>
              
              {/* Feature 4: Job Matching */}
              <div className="flex flex-col items-center text-center max-w-[120px]">
                {/* Circular icon container - purple color, scrolls to job-matching section */}
                <div
                  className="w-[70px] h-[70px] rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-lg mb-2.5 cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl text-[#8B5CF6] dark:text-purple-400"
                  onClick={() => handleSectionClick("job-matching")}
                >
                  {/* Briefcase SVG icon representing job opportunities */}
                  <svg
                    className="w-[30px] h-[30px]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                    ></path>
                  </svg>
                </div>
                {/* Feature label - step 4 text from translations */}
                <div className="text-sm font-medium dark:text-gray-200">{t.features.step4}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Export Hero component as default export
export default Hero;
