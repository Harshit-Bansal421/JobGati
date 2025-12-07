import React, { useState } from "react";
import { createUser } from "../services/userServices"; // ← backend login API
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";

const LoginModal = ({ onClose, onLogin }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { currentLanguage, translations } = useSelector(
    (state) => state.language
  );

  const dispatch = useDispatch();
  const t = translations[currentLanguage]?.forms || {};

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 🔥 1. Call REAL backend login API
      const res = await createUser(form);

      // 🔥 2. Update Redux
      dispatch(login(res.user));

      // 🔥 3. UI actions
      onLogin();
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  if (!translations[currentLanguage]) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-lg p-10 w-full max-w-[500px] shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">{t.loginTitle || "Login"}</h2>
          <button onClick={onClose} className="text-2xl text-gray-500">
            ×
          </button>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="mb-5">
            <label htmlFor="email">{t.email || "Email"}</label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div className="mb-5">
            <label>Name</label>
            <input
              id="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="password">{t.password || "Password"}</label>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white w-full py-2.5 rounded-md"
          >
            {t.login || "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
