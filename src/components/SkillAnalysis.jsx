import React, { useState } from 'react';

const SkillAnalysis = ({ t, userSkills }) => {
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyze = async () => {
    // Simulate API call
    // In real app: const res = await fetch("http://localhost:4000/api/ai/skill-analysis", ...);
    // For demo, we'll mock the response
    setTimeout(() => {
        setAnalysisResult({
            requiredSkills: ["Welding L3", "Solar Installation L2", "Electrical Safety L1"],
            userSkills: userSkills
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
          <button className="bg-primary text-white hover:bg-blue-600 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300" onClick={handleAnalyze}>
            {t.analyzeBtn}
          </button>

          {analysisResult && (
            <div className="bg-white rounded-lg p-5 mt-5 shadow-sm">
              <h3 className="text-xl mb-4 text-dark font-bold">{t.resultTitle}</h3>

              <div>
                <h4 className="text-lg font-semibold mb-2">{t.requiredSkills}</h4>
                <div className="flex flex-wrap gap-2.5 my-4">
                  {analysisResult.requiredSkills.map((skill, index) => (
                    <div key={index} className="bg-blue-50 text-primary px-4 py-2 rounded-[20px] text-sm font-medium">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">{t.yourSkills}</h4>
                <div className="flex flex-wrap gap-2.5 my-4">
                  {analysisResult.userSkills.map((skill, index) => (
                    <div key={index} className="bg-blue-50 text-primary px-4 py-2 rounded-[20px] text-sm font-medium">
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

export default SkillAnalysis;
