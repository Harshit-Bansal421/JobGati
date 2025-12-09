import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDashboardData } from "../services/dashboardServices.js";
import { BookOpen, ExternalLink } from "lucide-react";

const TrainingBridge = () => {
  const { clerkUser } = useSelector((state) => state.clerk);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      if (!clerkUser?.id) return;

      try {
        const data = await getDashboardData(clerkUser.id);
        setDashboardData(data);
        console.log("Dashboard Loaded:", data);
      } catch (err) {
        console.error("Error loading dashboard", err);
      }
    };

    loadDashboard();
  }, [clerkUser]);

  if (!dashboardData)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg animate-pulse">Loading Dashboard...</p>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl">
        {/* Heading */}
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-7 h-7 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Training Bridge</h1>
        </div>

        {/* USER INFO */}
        <div className="space-y-3 text-gray-700">
          <p><strong className="text-gray-900">Name:</strong> {dashboardData.name}</p>
          <p><strong className="text-gray-900">Phone:</strong> {dashboardData.phone}</p>
          <p><strong className="text-gray-900">Location:</strong> {dashboardData.location}</p>
          <p><strong className="text-gray-900">Desired Position:</strong> {dashboardData.desiredPosition}</p>
          <p><strong className="text-gray-900">Education:</strong> {dashboardData.educationLevel}</p>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {dashboardData.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">About</h3>
          <p className="text-gray-700 bg-gray-100 p-4 rounded-lg">
            {dashboardData.about || "No description provided."}
          </p>
        </div>

        {/* Training Recommendation Area */}
        <div className="mt-8 p-5 border rounded-xl bg-blue-50">
          <h3 className="text-xl font-bold text-blue-700">Recommended Training</h3>
          <p className="text-blue-800 mt-2">
            Based on your desired role, explore top online training resources to improve your career readiness.
          </p>

          <a
            href="https://www.coursera.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-blue-600 font-medium hover:underline"
          >
            Explore Courses <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TrainingBridge;
