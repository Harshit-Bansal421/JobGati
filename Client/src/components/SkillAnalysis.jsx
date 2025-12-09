import React, { useState } from 'react';
import { Target, BrainCircuit, AlertTriangle, CheckCircle2, Loader2, Zap } from 'lucide-react';
import CareerInterview from './CareerInterview';

const SkillAnalysisDashboard = () => {
  const [jobRole, setJobRole] = useState('');
  const [userSkills, setUserSkills] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // API HANDLER
  const handleAnalyze = async () => {
    if (!jobRole || !userSkills) {
      setError("Please fill in both fields.");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch('http://localhost:5000/api/skills/analyze-gap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userSkills: userSkills.split(',').map(s => s.trim()),
          jobRole: jobRole
        }),
      });

      if (!response.ok) throw new Error("Failed to connect to AI server");

      const result = await response.json();
      setData(result);

    } catch (err) {
      console.error(err);
      setError("Analysis failed. Is your backend running on Port 5000?");
    } finally {
      setLoading(false);
    }
  };

  // If no form shown and no data, don't render anything (removes blank space)
  if (!showForm && !data) {
    return (
      <div className="bg-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all inline-flex items-center gap-3 shadow-lg cursor-pointer"
          >
            <BrainCircuit className="w-6 h-6" />
            Generate Learning Path
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900 flex justify-center items-center gap-3">
            <BrainCircuit className="w-10 h-10 text-blue-600" />
            Skill Gap Analyzer
          </h1>
          <p className="text-gray-500">Focus: Readiness Percentage & Critical Gaps</p>
        </div>

        {/* INPUT SECTION - Only show if no data */}
        {!data && (
          <div className="animate-fade-in">
            <CareerInterview onBack={() => setShowForm(false)} />
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> {error}
          </div>
        )}

        {/* RESULTS SECTION */}
        {data && (
          <div className="animate-fade-in space-y-6">

            {/* READINESS PERCENTAGE CARD */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex justify-between items-center">

              <div className="flex items-center gap-4">
                <Zap
                  className={`w-8 h-8 ${data.readinessScore > 70
                    ? 'text-green-600'
                    : data.readinessScore > 40
                      ? 'text-yellow-600'
                      : 'text-red-600'
                    }`}
                />
                <h3 className="text-2xl font-semibold text-gray-800">
                  Your Readiness for {jobRole}:
                </h3>
              </div>

              <div className="text-right">
                <span
                  className={`text-5xl font-extrabold ${data.readinessScore > 70
                    ? 'text-green-600'
                    : data.readinessScore > 40
                      ? 'text-yellow-600'
                      : 'text-red-600'
                    }`}
                >
                  {data.readinessScore}%
                </span>
                <p className="text-sm text-gray-500 mt-1">Ready</p>
              </div>

            </div>

            {/* MISSING SKILLS */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-500" /> Missing Skills (Skill Gap)
              </h3>

              <div className="flex flex-wrap gap-3 mb-5">
                {data.skillGapAnalysis.missingSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-1.5 bg-red-100 text-red-800 border border-red-200 rounded-full font-medium text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <p className="text-gray-600 mt-4 border-l-4 border-red-300 pl-3 italic text-sm">
                "{data.skillGapAnalysis.criticalGaps}"
              </p>
            </div>

            {/* ADVICE */}
            <div className="bg-blue-50 p-4 rounded-xl text-blue-800 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <p className="font-medium">
                {data.learningRoadmap[0]?.action || "Review your current skills."}
              </p>
            </div>

            {/* Back Button */}
            <div className="text-center">
              <button
                onClick={() => {
                  setData(null);
                  setShowForm(false);
                }}
                className="text-gray-600 hover:text-blue-600 font-medium transition"
              >
                ← Back
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
export default SkillAnalysisDashboard;

