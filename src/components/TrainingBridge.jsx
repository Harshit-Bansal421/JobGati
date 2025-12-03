import React, { useState } from 'react';

const TrainingBridge = ({ t, onFindTraining }) => {
  const [trainingResult, setTrainingResult] = useState(null);

  const handleFindTraining = () => {
    // Simulate API call to find training
    setTimeout(() => {
      setTrainingResult({
        microCourses: [
          {
            name: "Advanced Welding Techniques",
            provider: "SkillIndia",
            duration: "4 weeks",
            format: "Online",
          },
          {
            name: "Digital Literacy for Workers",
            provider: "NPTEL",
            duration: "6 weeks",
            format: "Online",
          },
          {
            name: "Solar Panel Installation",
            provider: "NSDC",
            duration: "8 weeks",
            format: "Blended",
          },
        ],
        trainingCenters: [
          {
            name: "ITI Center Delhi",
            distance: "2.5 km",
            courses: ["Welding L3", "Solar Installation"],
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
      if (onFindTraining) onFindTraining();
    }, 1500);
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-[1000px] mx-auto px-5">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-dark">{t.title}</h2>
          <p className="text-lg text-gray-500 max-w-[600px] mx-auto">{t.description}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
          <button
            className="bg-primary text-white hover:bg-blue-600 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300"
            onClick={handleFindTraining}
          >
            {t.findTrainingBtn}
          </button>

          {trainingResult && (
            <div className="bg-white rounded-lg p-5 mt-5 shadow-sm">
              <h3 className="text-xl mb-4 text-dark font-bold">{t.resultTitle}</h3>

              <div>
                <h4 className="text-lg font-semibold mb-2">{t.microCourses}</h4>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 mt-5">
                  {trainingResult.microCourses.map((course, index) => (
                    <div key={index} className="bg-white rounded-lg p-5 shadow-md transition-transform duration-300 hover:-translate-y-1 border border-gray-100">
                      <h4 className="text-lg mb-2.5 text-dark font-bold">{course.name}</h4>
                      <p className="text-sm text-gray-500 mb-4">
                        <strong>Provider:</strong> {course.provider}
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        <strong>Duration:</strong> {course.duration}
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        <strong>Format:</strong> {course.format}
                      </p>
                      <button
                        className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300 mt-2.5"
                      >
                        Enroll
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-2">{t.trainingCenters}</h4>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 mt-5">
                  {trainingResult.trainingCenters.map((center, index) => (
                    <div key={index} className="bg-white rounded-lg p-5 shadow-md transition-transform duration-300 hover:-translate-y-1 border border-gray-100">
                      <h4 className="text-lg mb-2.5 text-dark font-bold">{center.name}</h4>
                      <p className="text-sm text-gray-500 mb-4">
                        <strong>Distance:</strong> {center.distance}
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        <strong>Courses:</strong>{" "}
                        {center.courses.join(", ")}
                      </p>
                      <button
                        className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300 mt-2.5"
                      >
                        View Details
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

export default TrainingBridge;
