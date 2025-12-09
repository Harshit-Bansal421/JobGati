import React, { useEffect, useState } from "react";

const Dashboard = ({ userId }) => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  // ============================
  // SAFE DASHBOARD LOADER
  // ============================
  useEffect(() => {
    async function loadDashboard() {
      try {
        const res = await fetch(`/api/dashboard/get/${userId}`);
        const data = await res.json();

        if (data.error) {
          // If dashboard not found → return empty safe structure
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
        // Also fail safely
        setDashboard({
          jobs: [],
          applications: [],
          messages: []
        });
      }

      setLoading(false);
    }

    if (userId) loadDashboard();
  }, [userId]);

  // ============================
  // LOADING STATE
  // ============================
  if (loading) return <p>Loading dashboard...</p>;

  // ============================
  // MAIN UI
  // ============================
  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Dashboard</h2>

      {/* ========== JOBS SECTION ========== */}
      <h3>Jobs</h3>
      {(dashboard?.jobs ?? []).length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        (dashboard?.jobs ?? []).map((job, index) => (
          <div key={index} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd" }}>
            <strong>{job.title || "Untitled Job"}</strong>
          </div>
        ))
      )}

      {/* ========== APPLICATIONS SECTION ========== */}
      <h3>Applications</h3>
      {(dashboard?.applications ?? []).length === 0 ? (
        <p>No applications.</p>
      ) : (
        (dashboard?.applications ?? []).map((app, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <strong>{app.position || "Unknown Position"}</strong>
          </div>
        ))
      )}

      {/* ========== MESSAGES SECTION ========== */}
      <h3>Messages</h3>
      {(dashboard?.messages ?? []).length === 0 ? (
        <p>No messages.</p>
      ) : (
        (dashboard?.messages ?? []).map((msg, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <p>{msg.text || "Empty message"}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
