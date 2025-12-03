import React, { useState } from 'react';

const API_URL = "http://localhost:4000";

const LoginPage = ({ setActivePage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    // Simulate API call
    // const res = await fetch(`${API_URL}/api/auth/login`, ...);
    
    // Mock success
    if (email && password) {
        // Store logged-in data
        localStorage.setItem("jobgati_token", "dummy_token");
        localStorage.setItem("jobgati_user", JSON.stringify({ name: "Abhishek Jaiswal" }));

        alert("Login successful!");

        // Go to dashboard
        setActivePage("dashboard");
    } else {
        setError("Please enter email and password");
    }
  };

  return (
    <div className="container mx-auto px-5 mt-12">
      <h2 className="text-3xl font-bold mb-8">Login</h2>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}

      <div className="mb-5">
        <label className="block mb-2 font-medium">Email:</label>
        <input
          className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label className="block mb-2 font-medium">Password:</label>
        <input
          className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="bg-success text-white hover:bg-green-600 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
