/**
 * TrainingBridge Component - Training & Education Recommendations
 * 
 * This component helps users find relevant training courses.
 */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const TrainingBridge = ({ t }) => {
  const [showResources, setShowResources] = useState(false);

  // Get user's desired position from Redux
  const { profileData } = useSelector((state) => state.clerk);
  const desiredPosition = profileData?.desiredPosition || '';

  const handleFindResources = () => {
    setShowResources(true);
    // In production, this would call an API to fetch training resources
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-[1000px] mx-auto px-5">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-dark">{t?.title || 'Training & Education'}</h2>
          <p className="text-lg text-gray-500 max-w-[600px] mx-auto">
            {t?.description || 'Discover courses and resources to enhance your skills'}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
          <button
            className="bg-green-600 text-white hover:bg-green-700 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300"
            onClick={handleFindResources}
          >
            {t?.findResourcesBtn || 'Find Training Resources'}
          </button>

          {showResources && (
            <div className="bg-white rounded-lg p-5 mt-5 shadow-sm">
              <h3 className="text-xl mb-4 text-dark font-bold">
                {t?.resultTitle || 'Recommended Resources'}
              </h3>
              <p className="text-gray-600">
                Training resources for {desiredPosition || 'your desired position'} will be displayed here.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Update your profile with your desired position to get personalized recommendations.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingBridge;
