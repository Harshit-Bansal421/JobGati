import React, { useState } from 'react';
import { Radar, Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { ArrowLeft, Loader2, TrendingUp } from 'lucide-react';

// Register ChartJS components
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, PointElement, LineElement, Filler);

const SkillAnalysisDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Get user data from Redux
  const { profileData } = useSelector((state) => state.clerk);
  const userSkills = profileData?.skills || [];
  const jobRole = profileData?.desiredPosition || 'Job Seeker';

  const handleAnalyze = async () => {
    if (userSkills.length === 0) {
      setError('Please add skills to your profile first!');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/skills/analyze-gap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userSkills,
          jobRole,
          jobDescription: `Looking for ${jobRole} position with relevant skills and experience.`
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze skills');
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
      setError('Failed to analyze skills. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- GRAPH CONFIGURATION ---

  // 1. RADAR CHART DATA (The "Spider" Graph)
  const radarConfig = data ? {
    labels: ['Technical', 'Practical', 'Soft Skills', 'Tools'],
    datasets: [
      {
        label: 'Your Capability',
        data: [
          data.radarChartData.Technical,
          data.radarChartData.Practical,
          data.radarChartData.SoftSkills,
          data.radarChartData.Tools
        ],
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        borderColor: 'rgba(37, 99, 235, 1)',
        borderWidth: 2,
      },
      {
        label: 'Job Requirement',
        data: [9, 8, 7, 9],
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        borderColor: 'rgba(156, 163, 175, 0.5)',
        borderDash: [5, 5],
      }
    ],
  } : null;

  // 2. DOUGHNUT CHART (The Match Score)
  const scoreConfig = data ? {
    labels: ['Match', 'Gap'],
    datasets: [{
      data: [data.matchScore, 100 - data.matchScore],
      backgroundColor: ['#16a34a', '#e5e7eb'],
      borderWidth: 0,
    }]
  } : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/user-dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">📊 AI Skill Gap Analysis</h1>
          <p className="text-gray-600 mt-2">
            Powered by Google Gemini AI - Analyze your skills for {jobRole}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Analyze Button */}
        {!data && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="mb-6">
              <TrendingUp className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Analyze Your Skills?</h2>
              <p className="text-gray-600">
                We'll compare your skills with industry requirements for {jobRole}
              </p>
              <div className="mt-4 text-sm text-gray-500">
                <p>Your Skills: {userSkills.join(', ') || 'None added yet'}</p>
              </div>
            </div>
            <button
              onClick={handleAnalyze}
              disabled={loading || userSkills.length === 0}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Run AI Analysis'
              )}
            </button>
          </div>
        )}

        {/* Results */}
        {data && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* GRAPH 1: The Match Score */}
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <h3 className="text-gray-500 mb-4 font-semibold">Overall Match Score</h3>
                <div className="w-48 h-48 mx-auto relative">
                  <Doughnut data={scoreConfig} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-800">{data.matchScore}%</span>
                  </div>
                </div>
                <p className="mt-6 text-sm text-gray-600 italic">{data.oneLineAdvice}</p>
              </div>

              {/* GRAPH 2: The Skill Radar */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500 mb-4 font-semibold">Category Breakdown</h3>
                <div className="h-64">
                  <Radar
                    data={radarConfig}
                    options={{
                      scales: { r: { min: 0, max: 10 } },
                      maintainAspectRatio: false
                    }}
                  />
                </div>
              </div>
            </div>

            {/* MISSING SKILLS LIST */}
            {data.missingSkills && data.missingSkills.length > 0 && (
              <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                <h3 className="text-red-800 font-bold mb-4 text-lg">⚠️ Missing Skills (Critical Gaps)</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {data.missingSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-white text-red-600 px-4 py-2 rounded-full text-sm border border-red-200 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => navigate('/training-bridge')}
                  className="text-sm text-blue-600 hover:text-blue-800 underline font-medium"
                >
                  Find courses for these skills →
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setData(null);
                  setError(null);
                }}
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
              >
                Analyze Again
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Explore Jobs
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillAnalysisDashboard;
