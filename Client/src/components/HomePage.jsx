/**
 * HomePage Component - Landing Page
 * 
 * This is the main landing page of the JobGati application.
 * It combines all feature sections: Hero, Skill Analysis, Gap Identification,
 * Training Bridge, and Job Matching into a single scrollable page.
 */

// Import React library
import React from 'react';

// Import feature section components
import Hero from './Hero';                         // Hero banner with CTA buttons
import SkillAnalysis from './SkillAnalysis';       // Skill assessment section
import GapIdentification from './GapIdentification'; // Skill gap analysis section
import TrainingBridge from './TrainingBridge';     // Training recommendations section
import JobMatching from './JobMatching';           // Job matching section

// Import Redux hook to access state
import { useSelector } from 'react-redux';

/**
 * HomePage functional component
 * Combines all sections of the landing page with translation support
 */
const HomePage = () => {
  // Access translations and current language from Redux language slice
  const { translations, currentLanguage } = useSelector((state) => state.language);

  // Get translation object for current language (e.g., translations['en'])
  // If currentLanguage translations don't exist, use empty object as fallback
  const t = translations[currentLanguage] || {};

  // Access user skills from Redux user slice
  // skills is an array of skill strings used by various sections
  const { skills } = useSelector((state) => state.user);

  /**
   * Helper function to scroll to specific sections smoothly
   * Used by Hero component CTA buttons to navigate to sections
   * @param {string} section - The id of the section to scroll to
   */
  const handleSectionClick = (section) => {
    // Find DOM element by id
    const element = document.getElementById(section);

    // If element exists, scroll to it smoothly
    if (element) {
      // scrollIntoView with smooth behavior creates animated scrolling
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Guard clause: Show loading if translations aren't loaded yet
  // This prevents rendering sections without proper translation text
  if (!translations[currentLanguage]) return <div>Loading...</div>;

  // Render the landing page with all sections
  return (
    <div>
      {/* Hero section - banner with title, description, and CTA buttons */}
      {/* Pass handleSectionClick so Hero buttons can navigate to sections */}
      <Hero handleSectionClick={handleSectionClick} />

      {/* Skill Analysis section - wrapped in div with id for scroll navigation */}
      <div id="skill-analysis">
        {/* Pass translation object - skills come from clerkSlice */}
        <SkillAnalysis t={t.interactive?.skillAnalysis} />
      </div>

      {/* Gap Identification section - analyzes skill gaps */}
      <div id="gap-identification">
        {/* Pass translation object and user skills as props */}
        <GapIdentification t={t.interactive?.gapIdentification} userSkills={skills} />
      </div>

      {/* Training Bridge section - recommends training courses */}
      <div id="training-bridge">
        {/* Pass translation object as props */}
        <TrainingBridge t={t.interactive?.trainingBridge} />
      </div>

      {/* Job Matching section - shows matched job opportunities */}
      <div id="job-matching">
        {/* Pass translation object and user skills as props */}
        <JobMatching t={t.interactive?.jobMatching} userSkills={skills} />
      </div>
    </div>
  );
};

// Export HomePage component as default export
export default HomePage;
