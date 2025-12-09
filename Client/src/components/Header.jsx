/**
 * Header Component - Global Navigation Bar
 * 
 * This component renders the main navigation header with:
 * - Logo and navigation links
 * - Theme toggle (dark/light mode)
 * - Language selector (English/Hindi)
 * - Authentication UI (Login button or Dashboard/Logout if logged in)
 * - Responsive mobile menu
 */

// Import React and useState for mobile menu toggle
import React, { useState } from 'react';

// Import logo
import jobgatiLogo from '../assets/jobgati_logo.jpeg';

// Import routing hooks and components
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Import Redux hooks for state management
import { useSelector, useDispatch } from 'react-redux';

// Import Redux actions
import { logout } from '../store/slices/authSlice';              // Log user out
import { toggleTheme } from '../store/slices/themeSlice';        // Toggle dark mode

// Import icons from lucide-react library
import { Menu, X, LayoutDashboard, Moon, Sun } from 'lucide-react';
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";

/**
 * Header functional component
 * @param {Function} setShowLogin - Callback to show login modal (from Layout)
 */
const Header = ({ setShowLogin }) => {
  // Local state for mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get navigation function for programmatic routing
  const navigate = useNavigate();

  // Get current location to highlight active nav item
  const location = useLocation();

  // Get dispatch function to trigger Redux actions
  const dispatch = useDispatch();

  // Access state from Redux store
  const { currentLanguage, translations } = useSelector((state) => state.language);  // Translations
  const { isLoggedIn } = useSelector((state) => state.auth);                        // Authentication status
  const { mode } = useSelector((state) => state.theme);                             // Theme mode (dark/light)
  const { isSignedIn: isClerkSignedIn } = useUser();

  // Extract translations for current language with fallback
  const t = translations[currentLanguage] || {};

  const isActive = (path) => {
    return location.pathname === path;
  };

  /**
   * handleNavClick - Navigates to a route and closes mobile menu
   * @param {string} path - Route path to navigate to
   */
  const handleNavClick = (path) => {
    navigate(path);         // Navigate to the path
    setIsMenuOpen(false);   // Close mobile menu after navigation
  };

  /**
   * handleLogout - Logs user out and redirects to homepage
   */
  const handleLogout = () => {
    dispatch(logout());     // Dispatch logout action to Redux
    navigate('/');          // Redirect to homepage
    setIsMenuOpen(false);   // Close mobile menu
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 cursor-pointer mr-2"
        >
          <img
            src={jobgatiLogo}
            alt="JobGati Logo"
            className="h-11 w-11 object-cover rounded-full p-1 bg-white shadow-md border-2 border-blue-100 dark:border-blue-900"
          />
          <span className="text-2xl font-bold text-primary dark:text-blue-400">JobGati</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {/* Home - Always visible */}
          <button
            onClick={() => handleNavClick('/')}
            className={`text-sm font-medium transition-colors hover:text-primary dark:hover:text-blue-400 whitespace-nowrap cursor-pointer ${isActive('/') ? 'text-primary dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'
              }`}
          >
            {t?.nav?.home || 'Home'}
          </button>

          {/* About - Always visible */}
          <button
            onClick={() => handleNavClick('/about')}
            className={`text-sm font-medium transition-colors hover:text-primary dark:hover:text-blue-400 whitespace-nowrap cursor-pointer ${isActive('/about') ? 'text-primary dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'
              }`}
          >
            About
          </button>

          {/* Service Seeker - Only when logged in */}
          {isLoggedIn && (
            <button
              onClick={() => handleNavClick('/service-seeker')}
              className={`text-sm font-medium transition-colors hover:text-primary dark:hover:text-blue-400 whitespace-nowrap cursor-pointer ${isActive('/service-seeker') ? 'text-primary dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'
                }`}
            >
              Service Seeker
            </button>
          )}
        </nav>

        {/* Actions (Theme, Language & Login) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {mode === 'dark' ? (
              <Sun size={18} className="text-yellow-500" />
            ) : (
              <Moon size={18} className="text-gray-600" />
            )}
          </button>

          {isClerkSignedIn ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/user-dashboard')}
                className="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </button>
              {/* Clerk UserButton handles logout */}
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <SignInButton mode="modal">
              <button
                className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors flex items-center gap-2"
              >
                {t?.forms?.login || 'Login'}
              </button>
            </SignInButton>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 py-4 px-4 flex flex-col gap-4 shadow-lg absolute w-full left-0 z-50">
          {/* Home - Always visible */}
          <button
            onClick={() => handleNavClick('/')}
            className={`text-left text-base font-medium transition-colors hover:text-primary dark:hover:text-blue-400 ${isActive('/') ? 'text-primary dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'
              }`}
          >
            {t?.nav?.home || 'Home'}
          </button>


          {/* About - Always visible */}
          <button
            onClick={() => handleNavClick('/about')}
            className={`text-left text-base font-medium transition-colors hover:text-primary dark:hover:text-blue-400 ${isActive('/about') ? 'text-primary dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'
              }`}
          >
            About
          </button>

          <div className="border-t border-gray-100 pt-4 flex flex-col gap-4">

            {isClerkSignedIn ? (
              <>
                <button
                  onClick={() => handleNavClick('/user-dashboard')}
                  className="text-left text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 flex items-center gap-2"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 text-sm">Account:</span>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </>
            ) : (
              <SignInButton mode="modal">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors w-full flex items-center justify-center gap-2"
                >
                  {t?.forms?.login || 'Login'}
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      )}
    </header >
  );
};

export default Header;
