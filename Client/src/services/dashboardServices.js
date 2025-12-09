const API_URL = "https://jobgati-1.onrender.com/api/dashboard";

export const saveDashboardData = async (payload) => {
  const response = await fetch(`${API_URL}/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  return response.json();
};

export const getDashboardData = async (clerkUserId) => {
  const res = await fetch(`${API_URL}/get/${clerkUserId}`);
  return res.json();
};
