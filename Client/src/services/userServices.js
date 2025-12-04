const API_URL = "http://localhost:5000/api/users";

export const createUser = async (userData) => {
  const res = await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  alert("User created successfully");
  return res.json();
};
