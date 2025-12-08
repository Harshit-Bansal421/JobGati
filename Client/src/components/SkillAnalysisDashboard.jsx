import React, { useState } from 'react';
import { Target, BrainCircuit, AlertTriangle, CheckCircle2, Loader2, Zap } from 'lucide-react';

const SkillAnalysisDashboard = () => {
  const [jobRole, setJobRole] = useState('');
  const [userSkills, setUserSkills] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
          jobRole
        })
      });

      if (!response.ok) throw new Error("Backend error");

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError("Analysis failed. Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900 flex justify-center items-center gap-3">
            <BrainCircuit className="w-10 h-10 text-blue-600" />
            Skill Gap Analyzer
          </h1>
          <p className="text-gray-500">Focus: Readiness Percentage & Critical Gaps</p>
        </div>

        {/* INPUT SECTION */}
        <div className="bg-white p-8 rounded-2xl shadow-md border grid md:grid-cols-3 gap-6 items-end">
          <div className="space-y-2">
            <label className="font-semibold text-gray-700">Desired Job Role</label>
            <div className="relative">
              <Target className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="e.g. Data Scientist"
                className="w-full pl-10 p-3 bg-gray-50 border rounded-xl"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-semibold text-gray-700">Your Current Skills</label>
            <input
              type="text"
              placeholder="e.g. Python, SQL, Excel"
              className="w-full p-3 bg-gray-50 border rounded-xl"
              value={userSkills}
              onChange={(e) => setUserSkills(e.target.value)}
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Run Analysis"}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> {error}
          </div>
        )}

        {/* RESULTS */}
        {data && (
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg border flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Zap
                  className={`w-8 h-8 ${
                    data.readinessScore > 70
                      ? "text-green-600"
                      : data.readinessScore > 40
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                />
                <h3 className="text-2xl font-semibold text-gray-800">
                  Your Readiness for {jobRole}:
                </h3>
              </div>

              <div className="text-right">
                <span
                  className={`text-5xl font-extrabold ${
                    data.readinessScore > 70
                      ? "text-green-600"
                      : data.readinessScore > 40
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {data.readinessScore}%
                </span>
                <p className="text-sm text-gray-500 mt-1">Ready</p>
              </div>
            </div>

            {/* Missing skills */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-500" /> Missing Skills
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

            <div className="bg-blue-50 p-4 rounded-xl text-blue-800 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <p className="font-medium">
                {data.learningRoadmap[0]?.action || "No advice available"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillAnalysisDashboard;
