import React, { useEffect, useState } from "react";

const Dashboard = ({ userId }) => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      try {
        const res = await fetch(
          `https://jobgati-1.onrender.com/api/dashboard/get/${userId}`
        );

        const data = await res.json();

        if (!isMounted) return;

        if (data.error) {
          setDashboard({
            jobs: [],
            applications: [],
            messages: []
          });
        } else {
          setDashboard(data);
        }
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);

        if (isMounted) {
          setDashboard({
            jobs: [],
            applications: [],
            messages: []
          });
        }
      }

      if (isMounted) setLoading(false);
    }

    if (userId) loadDashboard();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Dashboard</h2>

      <h3>Jobs</h3>
      {(dashboard?.jobs ?? []).map((job, index) => (
        <div key={index}>{job.title || "Untitled Job"}</div>
      ))}

      <h3>Applications</h3>
      {(dashboard?.applications ?? []).map((app, index) => (
        <div key={index}>{app.position || "Unknown"}</div>
      ))}

      <h3>Messages</h3>
      {(dashboard?.messages ?? []).map((msg, index) => (
        <div key={index}>{msg.text || "Empty"}</div>
      ))}
    </div>
  );
};

export default Dashboard;
