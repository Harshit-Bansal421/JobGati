const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/users`;

export const createUser = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    console.log("Services: createUser payload:", userData);

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

export const loginUser = async (credentials) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    console.error("Login user error:", error.message);
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const res = await fetch(`${API_URL}/get-by-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    
    if (!res.ok) {
        // If 404, we return null to indicate user not found (not an error)
        if (res.status === 404) return null;
        throw new Error(data.message || "Failed to fetch user");
    }

    return data;
  } catch (error) {
    console.error("Get user by email error:", error.message);
    throw error;
  }
};
