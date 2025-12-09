/**
 * TrainingBridge Component - Training & Education Recommendations
 * 
 * This component helps users find relevant training courses.
 * It displays courses based on user's desired position with horizontal scrolling.
 */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BookOpen, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import coursesData from '../data/coursesData.json';

const TrainingBridge = ({ t }) => {
  const [showCourses, setShowCourses] = useState(false);

  // Get user's desired position from Redux
  const { profileData } = useSelector((state) => state.clerk);
  const desiredPosition = profileData?.desiredPosition || '';

  // Filter courses based on desired position
  const matchedCategory = coursesData.find(
    category => category.skill_title.toLowerCase().includes(desiredPosition.toLowerCase()) ||
      desiredPosition.toLowerCase().includes(category.skill_title.toLowerCase())
  );

  const handleScroll = (direction) => {
    const container = document.getElementById('courses-container');
    if (container) {
      const scrollAmount = 400;
      const newPosition = direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-dark">{t?.title || '📚 Training & Courses'}</h2>
          <p className="text-lg text-gray-500 max-w-[600px] mx-auto">
            {t?.description || 'Discover courses to enhance your skills'}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
          {!showCourses ? (
            <div className="text-center">
              <button
                className="bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-md font-semibold cursor-pointer transition-all duration-300 inline-flex items-center gap-2"
                onClick={() => setShowCourses(true)}
              >
                📚 Explore Resources
              </button>
            </div>
          ) : (
            <div>
              {matchedCategory ? (
                <div>
                  {/* Category Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {matchedCategory.skill_title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {matchedCategory.description.map((desc, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                        >
                          {desc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Courses Horizontal Scroll */}
                  <div className="relative group">

                    {/* Left Scroll Button */}
                    <button
                      onClick={() => handleScroll('left')}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-label="Scroll left"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </button>

                    {/* Courses Container */}
                    <div
                      id="courses-container"
                      className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {matchedCategory.courses.map((course, idx) => (
                        <a
                          key={idx}
                          href={course.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-5 hover:shadow-xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1 group/card"
                        >
                          {/* Course Icon */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <BookOpen className="w-5 h-5 text-blue-600" />
                            </div>
                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover/card:text-blue-600 transition" />
                          </div>

                          {/* Course Title */}
                          <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                            {course.title}
                          </h4>

                          {/* Platform */}
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                              {course.platform}
                            </span>
                          </div>

                          {/* View Course Link */}
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <span className="text-blue-600 font-medium text-sm flex items-center gap-1 group-hover/card:gap-2 transition-all">
                              View Course
                              <ExternalLink className="w-4 h-4" />
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>

                    {/* Right Scroll Button */}
                    <button
                      onClick={() => handleScroll('right')}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-label="Scroll right"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-700" />
                    </button>
                  </div>

                  {/* Course Count */}
                  <div className="mt-4 text-sm text-gray-500 text-right">
                    {matchedCategory.courses.length} courses available
                  </div>

                  {/* Back Button */}
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setShowCourses(false)}
                      className="text-gray-600 hover:text-blue-600 font-medium transition"
                    >
                      ← Back
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">
                    No courses found for "{desiredPosition}".
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    Update your desired position in your profile to see relevant courses.
                  </p>
                  <button
                    onClick={() => setShowCourses(false)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    ← Back
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default TrainingBridge;
