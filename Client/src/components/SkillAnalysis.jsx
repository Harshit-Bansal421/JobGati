import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Radar, Doughnut } from 'react-chartjs-2';
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
import { Loader2, TrendingUp, AlertCircle } from 'lucide-react';

// Register ChartJS components
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, PointElement, LineElement, Filler);

const SkillAnalysis = ({ t }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Get user data from clerkSlice
  const { profileData } = useSelector((state) => state.clerk);
  const userSkills = profileData?.skills || [];
  const jobRole = profileData?.desiredPosition || 'Job Seeker';

  const handleAnalyze = async () => {
    if (!userSkills || userSkills.length === 0) {
      setError('Please add skills to your profile first! Go to Dashboard → Add Skills');
      console.error('❌ No skills found in user profile');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      console.log('🚀 Starting skill analysis...');
      console.log('📊 User Skills:', userSkills);
      console.log('💼 Job Role:', jobRole);

      const response = await fetch('https://jobgati-1.onrender.com/api/skills/analyze-gap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userSkills,
          jobRole,
          jobDescription: `Looking for ${jobRole} position with relevant skills and experience.`
        }),
      });

      console.log('📡 API Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error Response:', errorText);
        throw new Error(`API returned ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ Analysis Result:', result);
      setData(result);
    } catch (error) {
      console.error('❌ Skill Analysis Error:', error);
      console.error('Error Details:', {
        message: error.message,
        stack: error.stack
      });
      setError(`Failed to analyze skills: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Radar Chart Configuration
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

  // Doughnut Chart Configuration
  const scoreConfig = data ? {
    labels: ['Match', 'Gap'],
    datasets: [{
      data: [data.matchScore, 100 - data.matchScore],
      backgroundColor: ['#16a34a', '#e5e7eb'],
      borderWidth: 0,
    }]
  } : null;

  return (
    <div className="bg-white py-16">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-dark">{t?.title || '📊 AI Skill Analysis'}</h2>
          <p className="text-lg text-gray-500 max-w-[600px] mx-auto">
            {t?.description || 'Analyze your skills with AI and see how you match with job requirements'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <p className="text-red-800 font-medium">{error}</p>
              <p className="text-red-600 text-sm mt-1">Check browser console for detailed error logs</p>
            </div>
          </div>
        )}

        {/* Analyze Button */}
        {!data && (
          <div className="bg-gray-50 rounded-lg p-8 shadow-sm text-center">
            <TrendingUp className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600 mb-6">
              {userSkills && userSkills.length > 0
                ? `Ready to analyze ${userSkills.length} skills for ${jobRole}`
                : 'Add skills to your profile to get started'}
            </p>
            <button
              onClick={handleAnalyze}
              disabled={loading || !userSkills || userSkills.length === 0}
              className="bg-primary text-white hover:bg-blue-600 px-8 py-3 rounded-md font-semibold cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                t?.analyzeBtn || 'Analyze My Skills'
              )}
            </button>
          </div>
        )}

        {/* Results */}
        {data && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Match Score Chart */}
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                <h3 className="text-gray-700 mb-4 font-semibold text-center">Overall Match Score</h3>
                <div className="w-48 h-48 mx-auto relative">
                  <Doughnut data={scoreConfig} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-800">{data.matchScore}%</span>
                  </div>
                </div>
                <p className="mt-6 text-sm text-gray-600 italic text-center">{data.oneLineAdvice}</p>
              </div>

              {/* Skill Radar Chart */}
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                <h3 className="text-gray-700 mb-4 font-semibold text-center">Category Breakdown</h3>
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

            {/* Missing Skills */}
            {data.missingSkills && data.missingSkills.length > 0 && (
              <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                <h3 className="text-red-800 font-bold mb-4 text-lg">⚠️ Missing Skills (Critical Gaps)</h3>
                <div className="flex flex-wrap gap-2">
                  {data.missingSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-white text-red-600 px-4 py-2 rounded-full text-sm border border-red-200 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="text-center">
              <button
                onClick={() => {
                  setData(null);
                  setError(null);
                }}
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
              >
                Analyze Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillAnalysis;
