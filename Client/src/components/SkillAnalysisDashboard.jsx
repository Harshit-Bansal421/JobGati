import React, { useState } from 'react';
import { Doughnut, Radar } from 'react-chartjs-2';
import 'chart.js/auto'; // Auto-registers charts

const MatchDashboard = () => {
  // 1. INPUT STATE
  const [userSkills, setUserSkills] = useState("React, JavaScript, HTML, CSS");
  const [jobDesc, setJobDesc] = useState("Looking for MERN Stack Developer with MongoDB and Express experience.");
  
  // 2. RESULT STATE
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 3. THE HANDLER (Connects to Backend)
  const handleCheckMatch = async () => {
    setLoading(true);
    try {
      // Split text string into array for better AI processing
      const skillsArray = userSkills.split(',').map(s => s.trim());

      const response = await fetch('http://localhost:5000/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userSkills: skillsArray, 
          jobDescription: jobDesc 
        })
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Failed to connect to AI");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      
      {/* --- SECTION 1: INPUT FORM --- */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">🚀 Job Match Simulator</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Your Skills (comma separated)</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded" 
            value={userSkills}
            onChange={(e) => setUserSkills(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Job Description</label>
          <textarea 
            className="w-full p-2 border rounded h-24"
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />
        </div>

        <button 
          onClick={handleCheckMatch}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 w-full"
        >
          {loading ? "Analyzing with AI..." : "Analyze Match"}
        </button>
      </div>

      {/* --- SECTION 2: RESULTS DISPLAY --- */}
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* CARD A: SCORE */}
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-gray-500 font-bold mb-4">Match Probability</h3>
            <div className="w-40 h-40 mx-auto">
              <Doughnut data={{
                labels: ['Match', 'Gap'],
                datasets: [{
                  data: [result.matchPercentage, 100 - result.matchPercentage],
                  backgroundColor: ['#22c55e', '#e5e7eb']
                }]
              }} />
            </div>
            <p className="text-3xl font-bold mt-2">{result.matchPercentage}%</p>
          </div>

          {/* CARD B: SKILL RADAR */}
          <div className="bg-white p-6 rounded-xl shadow-md">
             <h3 className="text-gray-500 font-bold mb-2">Skill Profile</h3>
             <Radar data={{
                labels: ['Frontend', 'Backend', 'Tools'],
                datasets: [{
                  label: 'Competence Level',
                  data: [result.graphData.Frontend, result.graphData.Backend, result.graphData.Tools],
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  borderColor: '#3b82f6',
                  pointBackgroundColor: '#3b82f6'
                }]
             }} options={{ scales: { r: { min: 0, max: 10 } } }} />
          </div>

          {/* CARD C: MISSING SKILLS & ADVICE */}
          <div className="col-span-1 md:col-span-2 bg-red-50 p-6 rounded-xl border border-red-100">
            <h3 className="text-red-700 font-bold text-lg mb-2">⚠ Critical Gaps Found</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {result.missingSkills.map((skill, i) => (
                <span key={i} className="bg-white text-red-600 px-3 py-1 rounded-full text-sm border border-red-200">
                  {skill}
                </span>
              ))}
            </div>
            <p className="text-gray-700 italic">💡 <strong>AI Advice:</strong> {result.advice}</p>
          </div>

        </div>
      )}
    </div>
  );
};

export default MatchDashboard;