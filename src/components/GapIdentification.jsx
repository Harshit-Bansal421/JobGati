import React, { useState } from 'react';

const GapIdentification = ({ t, userSkills }) => {
  const [gapResult, setGapResult] = useState(null);

  const handleIdentify = async () => {
    // Simulate API call
    setTimeout(() => {
        setGapResult({
            score: 70,
            missingSkills: ["Welding L3", "Solar Installation L2"]
        });
    }, 1000);
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-[1000px] mx-auto px-5">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-dark">{t.title}</h2>
          <p className="text-lg text-gray-500 max-w-[600px] mx-auto">{t.description}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
          <button className="bg-primary text-white hover:bg-blue-600 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300" onClick={handleIdentify}>
            {t.identifyBtn}
          </button>
          
          {gapResult && (
            <div className="bg-white rounded-lg p-5 mt-5 shadow-sm">
              <h3 className="text-xl mb-4 text-dark font-bold">{t.resultTitle}</h3>

              <div className="text-center my-8">
                <div className="w-[120px] h-[120px] rounded-full bg-[conic-gradient(var(--color-primary)_70%,#e5e7eb_0)] flex items-center justify-center mx-auto mb-5 relative before:content-[''] before:absolute before:w-[90px] before:h-[90px] before:rounded-full before:bg-white">
                  <div className="relative z-10 text-2xl font-bold text-primary">{gapResult.score}%</div>
                </div>
                <h4 className="text-lg font-semibold">{t.gapScore}</h4>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">{t.missingSkills}</h4>
                <div className="flex flex-wrap gap-2.5 my-4">
                  {gapResult.missingSkills.map((skill, index) => (
                    <div key={index} className="bg-red-50 text-danger px-4 py-2 rounded-[20px] text-sm font-medium">
                      {skill}
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

export default GapIdentification;
