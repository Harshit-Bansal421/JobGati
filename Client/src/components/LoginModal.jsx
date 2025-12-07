import React, { useState } from "react";
import { loginUser } from "../services/userServices"; // ← backend login API
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";
import { setUserData } from "../store/slices/userSlice";

const LoginModal = ({ onClose, onLogin }) => {
  const [form, setForm] = useState({
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
      // 🔥 1. Call API
      const res = await loginUser(form);

      if (res.success) {
         // 🔥 2. Update Redux
         // The structure from backend is { user: {...}, profile: {...} }
         // The authSlice expects { loginDetails: action.payload.data }
         // We might need to adjust what we pass to match authSlice expectation or update authSlice.
         // Looking at authSlice: state.loginDetails = action.payload.data;
         // So we should pass { data: { ...res.user, ...res.profile } } or similar.
         // But wait, the user wants "get the data fields according to the type... and retrieve the data... in the redux model"
         
         dispatch(login({ data: { ...res.user, profile: res.profile } }));
         dispatch(setUserData(res.profile));

         // 🔥 3. UI actions
         onLogin();
         onClose();
      }
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
