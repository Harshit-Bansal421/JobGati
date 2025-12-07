const API_URL = "http://localhost:5000/api/users";

export const createUser = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    // Check if request failed
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to create user");
    }

    // Parse response
    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Create user error:", error.message);
    throw error;
  }
};
