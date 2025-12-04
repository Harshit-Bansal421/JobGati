/**
 * SignUpPage Component - Registration Type Selection
 * 
 * This component allows users to choose their account type before registration.
 * Provides two options: Job Seeker (individual) or Business (employer).
 * Features attractive cards with hover effects and iconography.
 */

// Import React library
import React from 'react';

// Import Link for client-side navigation
import { Link } from 'react-router-dom';

// Import useSelector to access translations from Redux
import { useSelector } from 'react-redux';

// Import icons from lucide-react library
import { User, Briefcase, ArrowRight } from 'lucide-react';

/**
 * SignUpPage functional component
 * Displays two registration options in an attractive card layout
 */
const SignUpPage = () => {
  // Get translations and current language from Redux store
  const { currentLanguage, translations } = useSelector((state) => state.language);
  
  // Extract translations for current language with fallback to empty object
  const t = translations[currentLanguage] || {};

  // Fallback text if translations are missing
  // This ensures the page works even if translation data isn't loaded
  const text = {
    title: t.signup?.title || "Choose Account Type",
    subtitle: t.signup?.subtitle || "Select the type of account you want to create to get started.",
    seeker: {
      title: t.signup?.seekerTitle || "Job Seeker",
      desc: t.signup?.seekerDesc || "Find jobs, get skill training, and build your career.",
      btn: t.signup?.seekerBtn || "Join as Job Seeker"
    },
    business: {
      title: t.signup?.businessTitle || "Business / Employer",
      desc: t.signup?.businessDesc || "Post jobs, find skilled workers, and grow your team.",
      btn: t.signup?.businessBtn || "Join as Business"
    },
    login: t.forms?.login || "Login",
    haveAccount: t.signup?.haveAccount || "Already have an account?"
  };

  // Render the sign up page
  return (
    // Section container - light gray background with vertical padding
    // min-h-[80vh] ensures minimum 80% viewport height
    // flex items-center vertically centers content
    <section className="py-20 bg-gray-50 min-h-[80vh] flex items-center">
      {/* Content wrapper - max width container with horizontal padding */}
      <div className="container mx-auto px-5">
        {/* Inner container with max width for better readability */}
        <div className="max-w-4xl mx-auto">
          {/* Page header - centered text */}
          <div className="text-center mb-12">
            {/* Page title - large, bold, dark text */}
            <h1 className="text-4xl font-bold mb-4 text-dark">{text.title}</h1>
            {/* Page subtitle - gray text */}
            <p className="text-lg text-gray-500">{text.subtitle}</p>
          </div>

          {/* Cards grid - responsive: 1 column on mobile, 2 columns on medium+ screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Job Seeker Card - clickable Link styled as a card */}
            <Link 
              to="/register-seeker"  // Navigate to job seeker registration
              className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border-2 border-transparent hover:border-primary flex flex-col items-center text-center no-underline"
            >
              {/* Icon container - circular background with user icon */}
              {/* group-hover:scale-110 scales icon on card hover */}
              <div className="w-20 h-20 rounded-full bg-blue-50 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <User size={40} /> {/* User icon from lucide-react */}
              </div>
              
              {/* Card title */}
              <h2 className="text-2xl font-bold text-dark mb-3">{text.seeker.title}</h2>
              
              {/* Card description */}
              <p className="text-gray-500 mb-8">{text.seeker.desc}</p>
              
              {/* Call-to-action text with arrow - mt-auto pushes to bottom of flex container */}
              <div className="mt-auto flex items-center text-primary font-semibold">
                {text.seeker.btn} 
                {/* Arrow icon that slides right on hover */}
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Business Card - clickable Link styled as a card */}
            <Link 
              to="/register-business"  // Navigate to business registration
              className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border-2 border-transparent hover:border-secondary flex flex-col items-center text-center no-underline"
            >
              {/* Icon container - circular background with briefcase icon */}
              {/* group-hover:scale-110 scales icon on card hover */}
              <div className="w-20 h-20 rounded-full bg-orange-50 text-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Briefcase size={40} /> {/* Briefcase icon from lucide-react */}
              </div>
              
              {/* Card title */}
              <h2 className="text-2xl font-bold text-dark mb-3">{text.business.title}</h2>
              
              {/* Card description */}
              <p className="text-gray-500 mb-8">{text.business.desc}</p>
              
              {/* Call-to-action text with arrow - mt-auto pushes to bottom of flex container */}
              <div className="mt-auto flex items-center text-secondary font-semibold">
                {text.business.btn} 
                {/* Arrow icon that slides right on hover */}
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          {/* Login link section - for users who already have an account */}
          <div className="text-center mt-12">
            <p className="text-gray-600">
              {text.haveAccount}{" "}  {/* Text before link */}
              {/* Login link - navigates to login page */}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                {text.login}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Export SignUpPage component as default export
export default SignUpPage;
