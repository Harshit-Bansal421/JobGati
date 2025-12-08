import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ExternalLink, ArrowLeft, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import coursesData from '../data/coursesData.json';

const CoursesPage = () => {
  const navigate = useNavigate();
  const [scrollPositions, setScrollPositions] = useState({});

  const handleScroll = (skillId, direction) => {
    const container = document.getElementById(`courses-${skillId}`);
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4 transition"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Training Courses</h1>
              <p className="text-gray-600 mt-1">Explore curated courses to enhance your skills</p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <p className="text-blue-800">
              <strong>💡 Tip:</strong> Scroll horizontally through courses in each category. Click on any course to visit the learning platform.
            </p>
          </div>
        </div>

        {/* Courses by Skill */}
        <div className="space-y-8">
          {coursesData.map((skillCategory) => (
            <div key={skillCategory.id} className="bg-white rounded-xl shadow-md p-6">

              {/* Skill Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {skillCategory.skill_title}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skillCategory.description.map((desc, idx) => (
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
                  onClick={() => handleScroll(skillCategory.id, 'left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>

                {/* Courses Container */}
                <div
                  id={`courses-${skillCategory.id}`}
                  className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {skillCategory.courses.map((course, idx) => (
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
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                        {course.title}
                      </h3>

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
                  onClick={() => handleScroll(skillCategory.id, 'right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              {/* Course Count */}
              <div className="mt-4 text-sm text-gray-500 text-right">
                {skillCategory.courses.length} courses available
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Ready to Start Learning?</h3>
          <p className="mb-6 opacity-90">Choose a course and begin your journey to mastery today!</p>
          <button
            onClick={() => navigate('/user-dashboard')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Update Your Skills
          </button>
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

export default CoursesPage;
