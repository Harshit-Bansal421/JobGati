/**
 * TrainingBridge Component - Training & Education Recommendations
 * 
 * This component helps users find relevant training courses.
 * It displays courses based on user's desired position with horizontal scrolling.
 */

import { getDashboardData } from "../services/dashboardServices.js";

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BookOpen, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import coursesData from '../data/coursesData.json';

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

  if (!dashboardData) return <p>Loading Dashboard...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Training Bridge</h1>
      
      <p><strong>Name:</strong> {dashboardData.name}</p>
      <p><strong>Phone:</strong> {dashboardData.phone}</p>
      <p><strong>Location:</strong> {dashboardData.location}</p>
      <p><strong>Desired Position:</strong> {dashboardData.desiredPosition}</p>
      <p><strong>Education:</strong> {dashboardData.educationLevel}</p>
      
      <h3 className="mt-4 font-semibold">Skills:</h3>
      <ul>
        {dashboardData.skills.map((skill, i) => (
          <li key={i}>• {skill}</li>
        ))}
      </ul>

      <h3 className="mt-4 font-semibold">About:</h3>
      <p>{dashboardData.about}</p>
    </div>
  );
};

export default TrainingBridge;
