/**
 * KarmaAI Component - FAQ Help System
 * 
 * This component renders a floating FAQ button in the bottom-right corner.
 * When clicked, it opens a modal with categorized FAQs including:
 * - Job Seeker Help
 * - Businessman Help
 * - General Help
 */

// Import React hooks for state management
import React, { useState } from 'react';

/**
 * FAQ Data Structure
 * Organized by category with questions and answers
 */
const faqData = {
  jobSeeker: {
    title: 'Job Seeker Help',
    icon: '👔',
    questions: [
      {
        q: 'How do I create a job seeker profile?',
        a: 'Click on "Sign Up" in the header, select "Job Seeker", and fill in your details including skills, experience, and upload your resume. Our AI will analyze your profile to match you with relevant opportunities.'
      },
      {
        q: 'How does skill analysis work?',
        a: 'Our AI analyzes your resume and profile to identify your key skills, experience level, and expertise areas. It then matches these with current job market demands to show you the best opportunities.'
      },
      {
        q: 'What is skill gap identification?',
        a: 'We compare your current skills with industry requirements and trending job postings to identify areas where additional training or certification could improve your employability and salary potential.'
      },
      {
        q: 'How do I find training programs?',
        a: 'After your skill gap is identified, navigate to the Training Bridge section where we recommend personalized courses, certifications, and learning paths to help you acquire the needed skills.'
      },
      {
        q: 'How does job matching work?',
        a: 'Our intelligent algorithm matches your skills, experience, location preferences, and career goals with employer requirements to present you with the most relevant job opportunities.'
      }
    ]
  },
  businessman: {
    title: 'Businessman Help',
    icon: '💼',
    questions: [
      {
        q: 'How do I post a job opening?',
        a: 'After creating a business account, go to your dashboard and click "Post Job". Fill in the job details, required skills, experience level, and our AI will help match you with qualified candidates.'
      },
      {
        q: 'How does candidate matching work?',
        a: 'Our AI analyzes your job requirements and matches them with job seeker profiles based on skills, experience, location, and career goals. You receive a ranked list of the most suitable candidates.'
      },
      {
        q: 'Can I search for candidates directly?',
        a: 'Yes! Use our advanced search filters to find candidates by skills, experience, location, education, and more. You can also save searches and set up alerts for new matching profiles.'
      },
      {
        q: 'What is the karma score?',
        a: 'The karma score reflects your company\'s reputation on our platform based on response time, interview feedback, hiring completion rate, and candidate reviews. Higher karma scores attract better talent.'
      },
      {
        q: 'How do I manage multiple job postings?',
        a: 'Your business dashboard provides a centralized view of all your active job postings. You can edit, pause, or close positions, and track applications for each posting individually.'
      }
    ]
  },
  general: {
    title: 'General Help',
    icon: '❓',
    questions: [
      {
        q: 'What is JobGati?',
        a: 'JobGati is an AI-powered job matching platform that bridges the gap between job seekers and employers. We use advanced algorithms to analyze skills, identify training needs, and create perfect job matches.'
      },
      {
        q: 'Is JobGati free to use?',
        a: 'Job seekers can create profiles and apply for jobs completely free. Businesses have access to basic features for free, with premium plans available for advanced features like priority listings and extended candidate searches.'
      },
      {
        q: 'How do I reset my password?',
        a: 'Click on "Login" in the header, then click "Forgot Password". Enter your registered email address and we\'ll send you a password reset link. Follow the instructions in the email to create a new password.'
      },
      {
        q: 'How is my data protected?',
        a: 'We use industry-standard encryption (SSL/TLS) for all data transmission. Your personal information is never shared with third parties without your consent. You can control your privacy settings from your dashboard.'
      },
      {
        q: 'Can I use JobGati on mobile devices?',
        a: 'Yes! JobGati is fully responsive and works seamlessly on smartphones and tablets. We also have mobile apps for iOS and Android available for download.'
      },
      {
        q: 'How do I contact support?',
        a: 'You can reach our support team via email at support@jobgati.com, use the live chat feature in your dashboard, or call us at 1-800-JOBGATI (562-4284) during business hours (9 AM - 6 PM IST).'
      }
    ]
  }
};

/**
 * KarmaAI functional component
 * Renders a floating FAQ button and modal system
 */
const KarmaAI = () => {
  // State to control modal visibility
  const [isOpen, setIsOpen] = useState(false);

  // State to track selected category (null = show category selection)
  const [selectedCategory, setSelectedCategory] = useState(null);

  // State to track which question is expanded
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  /**
   * Toggle FAQ modal open/close
   */
  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Reset to category selection when opening
      setSelectedCategory(null);
      setExpandedQuestion(null);
    }
  };

  /**
   * Select a FAQ category
   */
  const selectCategory = (category) => {
    setSelectedCategory(category);
    setExpandedQuestion(null);
  };

  /**
   * Go back to category selection
   */
  const goBackToCategories = () => {
    setSelectedCategory(null);
    setExpandedQuestion(null);
  };

  /**
   * Toggle question expansion
   */
  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  return (
    <>
      {/* Floating FAQ Button */}
      <button
        onClick={toggleModal}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-primary hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer z-[99] transform hover:scale-110"
        aria-label="Open FAQ Help"
      >
        {/* Question Mark Icon */}
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {/* FAQ Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col animate-fadeIn">

            {/* Modal Header */}
            <div className="bg-gradient-to-r from-primary to-blue-600 dark:from-blue-700 dark:to-blue-800 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {selectedCategory && (
                  <button
                    onClick={goBackToCategories}
                    className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
                    aria-label="Go back"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}
                <h2 className="text-2xl font-bold">
                  {selectedCategory ? faqData[selectedCategory].title : 'How Can We Help You?'}
                </h2>
              </div>
              <button
                onClick={toggleModal}
                className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
                aria-label="Close FAQ"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto flex-1 p-6">

              {/* Category Selection View */}
              {!selectedCategory && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                  {/* Job Seeker Category */}
                  <button
                    onClick={() => selectCategory('jobSeeker')}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 hover:from-blue-100 hover:to-blue-200 dark:hover:from-gray-600 dark:hover:to-gray-500 rounded-xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-left"
                  >
                    <div className="text-5xl mb-3">{faqData.jobSeeker.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      {faqData.jobSeeker.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Find answers about profiles, skills, and job matching
                    </p>
                  </button>

                  {/* Businessman Category */}
                  <button
                    onClick={() => selectCategory('businessman')}
                    className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-600 hover:from-green-100 hover:to-green-200 dark:hover:from-gray-600 dark:hover:to-gray-500 rounded-xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-left"
                  >
                    <div className="text-5xl mb-3">{faqData.businessman.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      {faqData.businessman.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Learn about posting jobs and finding candidates
                    </p>
                  </button>

                  {/* General Help Category */}
                  <button
                    onClick={() => selectCategory('general')}
                    className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-700 dark:to-gray-600 hover:from-purple-100 hover:to-purple-200 dark:hover:from-gray-600 dark:hover:to-gray-500 rounded-xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-left"
                  >
                    <div className="text-5xl mb-3">{faqData.general.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      {faqData.general.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      General questions about JobGati
                    </p>
                  </button>

                </div>
              )}

              {/* Questions & Answers View */}
              {selectedCategory && (
                <div className="space-y-4">
                  {faqData[selectedCategory].questions.map((item, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden transition-all duration-300"
                    >
                      {/* Question Button */}
                      <button
                        onClick={() => toggleQuestion(index)}
                        className="w-full text-left p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center justify-between gap-4"
                      >
                        <span className="font-semibold text-gray-800 dark:text-white">
                          {item.q}
                        </span>
                        <svg
                          className={`w-5 h-5 text-gray-600 dark:text-gray-300 transition-transform flex-shrink-0 ${expandedQuestion === index ? 'transform rotate-180' : ''
                            }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Answer (Expandable) */}
                      {expandedQuestion === index && (
                        <div className="p-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-600 animate-fadeIn">
                          {item.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
              <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                Still need help? Contact us at{' '}
                <a href="mailto:support@jobgati.com" className="text-primary dark:text-blue-400 hover:underline font-medium">
                  support@jobgati.com
                </a>
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

// Export KarmaAI component as default export
export default KarmaAI;
