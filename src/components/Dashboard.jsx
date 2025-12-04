/**
 * Dashboard Component - User Dashboard
 * 
 * This is the main dashboard displayed after login showing:
 * - User profile with avatar and skills
 * - Skill gap radar chart placeholder
 * - Progress indicator
 * - AI assistant card
 * - Top job matches
 */

// Import React library
import React from 'react';

// Import useSelector to access Redux state
import { useSelector } from 'react-redux';

/**
 * Dashboard functional component
 * Displays user dashboard with profile, skills, progress, and job matches
 */
const Dashboard = () => {
  // Access translations and current language from Redux
  const { currentLanguage, translations } = useSelector((state) => state.language);
  
  // Access authenticated user data from Redux auth state
  const { user } = useSelector((state) => state.auth);
  
  // Access user skills from Redux user state
  const { skills } = useSelector((state) => state.user);
  
  // Extract dashboard translations for current language with fallback to empty object
  const t = translations[currentLanguage]?.dashboard || {};

  // Guard clause: Return null if translations aren't loaded yet
  if (!translations[currentLanguage]) return null;

  // Render the dashboard
  return (
    // Main section - vertical padding with dark mode background
    <section className="py-20 dark:bg-gray-900">
      {/* Content wrapper - max width container with horizontal padding */}
      <div className="container mx-auto px-5">
        {/* Welcome heading - large, bold, left-aligned */}
        <h1 className="text-4xl font-bold mb-12 text-dark dark:text-white text-left">
          {t.welcome} {/* Welcome message from translations */}
        </h1>
        
        {/* Main dashboard grid - sidebar and content area
            - 1 column on mobile
            - Sidebar (280px) + content on medium screens
            - Wider sidebar (320px) + content on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-6 lg:gap-8">
          
          {/* Left sidebar - User profile card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 lg:p-8 shadow-sm text-center h-fit">
            {/* User avatar - circular with first letter of name */}
            <div className="w-[120px] h-[120px] rounded-full bg-primary mx-auto mb-5 flex items-center justify-center text-white text-[40px] font-bold relative">
              {/* Display first letter of user's name, or 'U' as fallback */}
              {user?.name ? user.name.charAt(0) : 'U'}
              
              {/* Verified badge - green checkmark in top-right corner */}
              <div className="absolute top-2.5 right-2.5 bg-success text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">✓</div>
            </div>
            
            {/* User name */}
            <h3 className="text-2xl font-semibold mb-1 dark:text-white">
              {user?.name || t.profile.name} {/* Display user name from state or translation fallback */}
            </h3>
            
            {/* User title/role */}
            <p className="text-gray-500 dark:text-gray-400 mb-5">
              {t.profile.title}
            </p>
            
            {/* Current skills section */}
            <div>
              {/* Section heading */}
              <h4 className="font-medium mb-2 dark:text-gray-200">Current Skills:</h4>
              
              {/* Skills pills container - flexbox with wrapping, centered */}
              <div className="flex flex-wrap gap-2.5 justify-center mt-5">
                {/* Map through user skills and render each as a pill */}
                {skills.map((skill, index) => (
                  // Skill pill - blue background with rounded corners
                  <span key={index} className="bg-blue-50 dark:bg-blue-900 text-primary dark:text-blue-300 px-3 py-1.5 rounded-[20px] text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right content area - Charts and widgets grid */}
          <div className="dashboard-content grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
            
            {/* Skill gap chart card - takes 2/3 width on large screens */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              {/* Card heading */}
              <h3 className="text-lg font-semibold mb-5 dark:text-white">{t.skillGap}</h3>
              
              {/* Chart placeholder - would contain actual radar chart in production */}
              <div className="w-full h-[300px] bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
                Radar Chart: User Skills vs Required Job Role
              </div>
              
              {/* Chart legend/description */}
              <p
                className="text-xs text-gray-500 dark:text-gray-400 mt-2.5"
              >
                Blue: Your Skills | Orange: Required for Solar
                Technician
              </p>
            </div>
            
            {/* Right column - Progress and AI widgets, stacked vertically */}
            <div
              className="flex flex-col gap-8"
            >
              {/* Progress widget - circular progress indicator */}
              <div
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm text-center"
              >
                {/* Widget heading */}
                <h3 className="text-lg font-semibold mb-5 dark:text-white">{t.progress}</h3>
                
                {/* Circular progress indicator
                    Using conic-gradient to show 80% progress
                    ::before pseudo-element creates white inner circle for ring effect */}
                <div className="w-[150px] h-[150px] rounded-full bg-[conic-gradient(var(--color-primary)_80%,#e5e7eb_0)] flex items-center justify-center mx-auto mb-5 relative before:content-[''] before:absolute before:w-[120px] before:h-[120px] before:rounded-full before:bg-white">
                  {/* Progress percentage - centered inside circle */}
                  <div className="relative z-10 text-2xl font-bold text-primary">80%</div>
                </div>
                
                {/* Progress label */}
                <p className="dark:text-gray-200">{t.ready}</p>
                
                {/* Certification unlocked badge */}
                <div
                  className="text-warning font-semibold mt-2.5"
                >
                  {/* Shield emoji with accessibility label */}
                  <span role="img" aria-label="shield">
                    🛡️
                  </span>{" "}
                  {t.unlocked}
                </div>
              </div>
              
              {/* AI Assistant card - KarmaAI feature promotion */}
              <div
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm text-center"
              >
                {/* Help/question mark SVG icon */}
                <svg
                  className="w-12 h-12 text-primary dark:text-blue-400 mx-auto mb-2.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Question mark in circle icon path */}
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.43 12.56 13 13.01 13 14h-2c0-.56.44-1.01 1-1.46l.9-.92C13.79 11.23 14 10.79 14 10c0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .79-.21 1.54-.63 2.19z"></path>
                </svg>
                
                {/* AI assistant title */}
                <p className="font-semibold dark:text-white">
                  {t.askAI}
                </p>
                
                {/* AI assistant description */}
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t.aiDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Job matches section - full width below main grid */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mt-8">
          {/* Section heading */}
          <h3 className="text-lg font-semibold mb-5 dark:text-white">{t.topMatches}</h3>
          
          {/* Job match card 1 - High match percentage */}
          <div className="flex flex-col md:flex-row items-center justify-between p-5 rounded-lg mb-4 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-primary gap-4 md:gap-0">
            {/* Left side - match percentage and job details */}
            <div
              className="flex items-center gap-5"
            >
              {/* Match percentage - large, bold, primary color */}
              <div className="text-3xl font-bold text-primary">
                {t.match1.percent}
              </div>
              
              {/* Job details - title and description */}
              <div className="job-details">
                <h4 className="text-lg mb-1.5 font-medium dark:text-white">{t.match1.title}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{t.match1.desc}</p>
              </div>
            </div>
            
            {/* Right side - action buttons */}
            <div className="flex gap-2.5">
              {/* Close Gap button - orange, suggests training to fill skill gaps */}
              <button className="bg-secondary text-white hover:bg-orange-600 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300">
                {t.closeGap}
              </button>
              
              {/* View Details button - outlined primary */}
              <button className="bg-transparent border border-primary dark:border-blue-400 text-primary dark:text-blue-400 hover:bg-primary dark:hover:bg-blue-600 hover:text-white px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300">
                {t.viewDetails}
              </button>
            </div>
          </div>
          
          {/* Job match card 2 - Lower matchpercentage */}
          <div className="flex flex-col md:flex-row items-center justify-between p-5 rounded-lg mb-4 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-primary gap-4 md:gap-0">
            {/* Left side - match percentage and job details */}
            <div
              className="flex items-center gap-5"
            >
              {/* Match percentage - yellow/warning color indicates lower match */}
              <div
                className="text-3xl font-bold text-warning"
              >
                {t.match2.percent}
              </div>
              
              {/* Job details - title and description */}
              <div className="job-details">
                <h4 className="text-lg mb-1.5 font-medium dark:text-white">{t.match2.title}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{t.match2.desc}</p>
              </div>
            </div>
            
            {/* Apply Now button - standard primary blue */}
            <button className="bg-primary text-white hover:bg-blue-600 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300">
              {t.applyNow}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Export Dashboard component as default export
export default Dashboard;
