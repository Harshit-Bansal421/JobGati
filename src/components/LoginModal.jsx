import React, { useState } from 'react';

const LoginModal = ({ t, onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login process
    if (email && password) {
      if (onLogin) onLogin();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-lg p-10 w-full max-w-[500px] shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">{t.loginTitle}</h2>
          <button className="bg-none border-none text-2xl cursor-pointer text-gray-500" onClick={onClose}>
            ×
          </button>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 font-medium">{t.email}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 font-medium">{t.password}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div className="mb-5 flex justify-between items-center">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="ml-2 font-medium">
                {t.rememberMe}
              </label>
            </div>
            <a href="#" className="text-primary no-underline">{t.forgotPassword}</a>
          </div>
          <button
            type="submit"
            className="bg-primary text-white hover:bg-blue-600 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300 w-full"
          >
            {t.login}
          </button>
          <div className="text-center mt-5">
            <p>
              {t.noAccount}{" "}
              <a
                href="#"
                className="text-primary no-underline"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
              >
                {t.signUp}
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
