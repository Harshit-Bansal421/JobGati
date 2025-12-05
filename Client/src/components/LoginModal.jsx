
import React, { useState } from "react";
import { createUser } from "../services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";

const LoginModal = ({ onClose, onLogin }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    type:""
  });

  const { currentLanguage, translations } = useSelector(
    (state) => state.language
  );
 
  
  const dispatch = useDispatch();

  const t = translations[currentLanguage]?.forms || {};

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  }

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await createUser(form);  // 👈 actual API call
    console.log("User created:", res.data);

    dispatch(login(form));
    onLogin();
    onClose();

  } catch (error) {
    console.error("Error creating user", error);
    alert("Failed to create user");
  }
};


  // Guard clause: don't render modal if translations aren't loaded yet
  if (!translations[currentLanguage]) return null;

  // Render the login modal
  return (
    // Modal backdrop - full screen overlay with semi-transparent black background
    // fixed - positioned relative to viewport
    // inset-0 - top, right, bottom, left all set to 0 (covers entire screen)
    // bg-black/50 - black background with 50% opacity
    // flex items-center justify-center - centers modal content
    // z-[1000] - very high z-index to appear above all other content
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
      {/* Modal container - white box in center of screen */}
      <div className="bg-white rounded-lg p-10 w-full max-w-[500px] shadow-xl">
        {/* Modal header - title and close button */}
        <div className="flex justify-between items-center mb-8">
          {/* Modal title - uses translation or fallback to 'Login' */}
          <h2 className="text-2xl font-bold">{t.loginTitle || "Login"}</h2>

          {/* Close button - X symbol to close modal */}
          <button
            className="bg-none border-none text-2xl cursor-pointer text-gray-500"
            onClick={onClose}
          >
            × {/* HTML entity for multiplication sign used as close icon */}
          </button>
        </div>

        {/* Login form - calls handleLogin on submit */}
        <form className="login-form" onSubmit={handleLogin}>
          {/* Email input field container */}
          <div className="mb-5">
            {/* Email label */}
            <label htmlFor="email" className="block mb-2 font-medium">
              {t.email || "Email"}
            </label>
            {/* Email input - controlled component (value tied to state) */}
            <input
              type="email" // HTML5 email validation
              id="email" // Matches htmlFor in label
              value={form.email} // Controlled by email state

              onChange={handleChange} // Updates state on change

              required // HTML5 required validation
              className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Password input field container */}
          <div className="mb-5">
            {/* Password label */}
            <label htmlFor="password" className="block mb-2 font-medium">
              {t.password || "Password"}
            </label>
            {/* Password input - controlled component (value tied to state) */}
            <input
              type="password" // Masks password characters
              id="password" // Matches htmlFor in label
              value={form.password} // Controlled by password state
              onChange={handleChange} // Updates state on change
              required // HTML5 required validation
              className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Remember me and forgot password row */}
          <div className="mb-5 flex justify-between items-center">
            {/* Remember me checkbox */}
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="ml-2 font-medium">
                {t.rememberMe || "Remember Me"}{" "}
                {/* Translation or fallback text */}
              </label>
            </div>

            {/* Forgot password link */}
            <a href="#" className="text-primary no-underline">
              {t.forgotPassword || "Forgot Password?"}
            </a>
          </div>

          {/* Login submit button */}
          <button
  type="submit"
  className="bg-primary text-white hover:bg-blue-600 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300 w-full"
>
  {t.login || "Login"}
</button>


          {/* Sign up link section */}
          <div className="text-center mt-5">
            <p>
              {t.noAccount || "Don't have an account?"} {/* Text before link */}
              {/* Sign up link - closes modal when clicked */}
              <a
                href="#"
                className="text-primary no-underline"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default link behavior
                  onClose(); // Close the login modal
                }}
              >
                {t.signUp || "Sign Up"} {/* Link text from translations */}
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

// Export LoginModal component as default export
export default LoginModal;
