/**
 * Dashboard Component - User Dashboard
 * 
 * This is the main dashboard container that routes to the specific dashboard
 * view based on the user's type (Job Seeker, Business, or Normal User).
 */

import React from 'react';
import { useSelector } from 'react-redux';
import JobSeekerDashboard from './JobSeekerDashboard';
import BusinessDashboard from './BusinessDashboard';
import ShortTermDashboard from './ShortTermDashboard';

/**
 * Dashboard functional component
 * Routes to the appropriate dashboard based on user type
 */
const Dashboard = () => {
  // Access authenticated user data and type from Redux auth state
  const { user, type } = useSelector((state) => state.auth);

  // Determine which dashboard to render based on user type
  // Note: Adjust the type string checks ('jobseeker', 'business', 'user') 
  // to match exactly what your backend/redux store uses.

  if (type === 'jobseeker' || user?.role === 'jobseeker') {
    return <JobSeekerDashboard />;
  }

  if (type === 'business' || user?.role === 'business') {
    return <BusinessDashboard />;
  }

  if (type === 'user' || user?.role === 'user') {
    return <ShortTermDashboard />;
  }

  // Fallback or default view if type is not defined (e.g., for testing or new users)
  // For now, defaulting to JobSeekerDashboard or a generic view
  return <JobSeekerDashboard />;
};

export default Dashboard;
