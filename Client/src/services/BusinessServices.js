const API_URL = "http://localhost:5000/api/business";

export const createBusiness = async (businessData) => {
  try {
    const res = await fetch(`${API_URL}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(businessData),
    });
    console.log("Request payload:", businessData);
    console.log("Response status:", res.status);

    const data = await res.json(); // CALL ONLY ONCE

    if (!res.ok) {
      console.error("Backend Error:", data);
      alert("Failed to create business");
      return null;
    }

    alert("Business created successfully");
    return data;

  } catch (err) {
    console.error("Network error:", err);
    alert("Network error: Could not reach server");
    return null;
  }
};
