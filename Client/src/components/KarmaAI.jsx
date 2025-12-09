/**
 * KarmaAI Component - FAQ Help System
 * 
 * This component renders a floating FAQ button in the bottom-right corner.
 * When clicked, it opens a modal with frequently asked questions about JobGati's
 * AI-powered interview and roadmap system.
 */

import React, { useState } from 'react';

/**
 * FAQ Data Structure
 * All questions about JobGati's AI interview workflow
 */
const faqData = [
  {
    q: 'How does JobGati work?',
    a: 'JobGati uses an AI-powered interview process. First, you enter your basic info (age, degree, education). Then you list your current skills and desired job position. Our AI then asks you targeted questions one-by-one to deeply understand your capabilities and creates a personalized roadmap to help you achieve your career goals.'
  },
  {
    q: 'What happens after I enter my basic information?',
    a: 'After entering your basic details and current skills, our AI Agent starts an interactive interview. It asks you questions relevant to your desired job position, analyzes your responses in real-time, and adapts the next question based on your answers. This helps us understand your true skill level beyond just keywords.'
  },
  {
    q: 'How does the AI interview process work?',
    a: 'The AI asks you one question at a time about your skills, experience, and knowledge related to your desired job. After you answer, it processes your response and asks the next relevant question. This conversational approach helps the AI understand your depth of knowledge and identify exactly what you need to learn.'
  },
  {
    q: 'What is the job achievement probability?',
    a: 'After the interview, our AI calculates your probability of achieving your desired job position based on your current skills, experience, and the market requirements. It provides detailed reasoning, highlights edge cases, and shows you exactly what gaps you need to fill to increase your chances.'
  },
  {
    q: 'Will I see success stories of people like me?',
    a: 'Yes! If available, we show you examples of people who started with similar skills and successfully landed the job you\'re targeting. This helps you understand the journey and stay motivated knowing others have achieved it from a similar starting point.'
  },
  {
    q: 'What does the personalized roadmap include?',
    a: 'Your roadmap is custom-built based on your interview responses. It includes: specific skills to learn, recommended courses, estimated timeline, practice projects, and milestones. The roadmap adapts to your current knowledge level and learning pace.'
  },
  {
    q: 'What information do I need to provide?',
    a: 'You need to provide: 1) Basic info (age, degree, education), 2) Your current skills, 3) Desired job position. Then our AI will guide you through an interactive interview to understand your capabilities better.'
  },
  {
    q: 'How long does the AI interview take?',
    a: 'The interview typically takes 10-20 minutes depending on your desired role and experience level. The AI asks relevant questions one at a time, so you can take breaks and resume later if needed.'
  },
  {
    q: 'Is my data safe during the interview?',
    a: 'Yes! All your responses are encrypted and stored securely. We use Clerk for authentication and never share your personal information or interview responses without your consent.'
  },
  {
    q: 'Can I retake the interview?',
    a: 'Absolutely! You can update your profile and retake the interview anytime. This is useful if you\'ve learned new skills or want to target a different job position. The AI will generate a fresh roadmap based on your updated responses.'
  },
  {
    q: 'What if the AI asks a question I don\'t understand?',
    a: 'You can skip questions or ask for clarification. The AI adapts based on your responses, so if you\'re unsure about something, it will adjust the difficulty and focus on areas where you have knowledge.'
  },
  {
    q: 'How accurate is the probability calculation?',
    a: 'Our AI uses advanced language models (Llama 3.3 70B) trained on industry data to calculate your job achievement probability. It considers your skills, experience, market demand, and typical requirements. The reasoning provided helps you understand exactly what factors affect your chances.'
  },
  {
    q: 'Can I use JobGati on mobile?',
    a: 'Yes! JobGati works on all devices. However, for the best interview experience with easier typing and better visibility of questions and roadmaps, we recommend using a desktop or tablet.'
  }
];

const KarmaAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setExpandedQuestion(null);
    }
  };

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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-3 md:p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] md:max-h-[80vh] overflow-hidden flex flex-col animate-fadeIn">

            {/* Modal Header */}
            <div className="bg-gradient-to-r from-primary to-blue-600 dark:from-blue-700 dark:to-blue-800 text-white p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Frequently Asked Questions
              </h2>
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
              <div className="space-y-4">
                {faqData.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden transition-all duration-300"
                  >
                    {/* Question Button */}
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="w-full text-left p-3 md:p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center justify-between gap-3 md:gap-4 cursor-pointer"
                    >
                      <span className="font-semibold text-sm md:text-base text-gray-800 dark:text-white">
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
                      <div className="p-3 md:p-4 bg-white dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-600 animate-fadeIn">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
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

export default KarmaAI;
