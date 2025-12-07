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

// Import routing hooks and components
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Import Redux hooks for state management
import { useSelector, useDispatch } from 'react-redux';

// Import Redux actions
import { setLanguage } from '../store/slices/languageSlice';    // Change app language
import { logout } from '../store/slices/authSlice';              // Log user out
import { toggleTheme } from '../store/slices/themeSlice';        // Toggle dark mode

// Import icons from lucide-react library
import { Menu, X, Globe, User, LogOut, LayoutDashboard, Moon, Sun } from 'lucide-react';

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
  
  // Extract translations for current language with fallback
  const t = translations[currentLanguage] || {};

  // Navigation items array - defines all navigation links
  const navItems = [
    { path: '/', label: t?.nav?.home || 'Home' },
    { path: '/register-seeker', label: t?.nav?.forJobSeekers || 'For Job Seekers' },
    { path: '/register-business', label: t?.nav?.forBusinesses || 'For Businesses' },
    {path: '/about', label:'About'}
    // Commented out - future navigation items
    // { path: '/about', label: t?.nav?.about || 'About' }, 
    // { path: '/contact', label: t?.nav?.contact || 'Contact' },
  ];

  /**
   * isActive - Checks if a navigation item is currently active
   * @param {string} path - Route path to check
   * @returns {boolean} True if the path matches current location
   */
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
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/"
          className="text-2xl font-bold text-primary dark:text-blue-400 cursor-pointer flex items-center gap-2"
        >
          <span>JobGati</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-3 lg:gap-6">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`text-xs lg:text-sm font-medium transition-colors hover:text-primary dark:hover:text-blue-400 whitespace-nowrap ${
                isActive(item.path) ? 'text-primary dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              {item.label}
            </button>
          ))}
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

          <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1">
            <Globe size={16} className="text-gray-500 dark:text-gray-400" />
            <select
              value={currentLanguage}
              onChange={(e) => dispatch(setLanguage(e.target.value))}
              className="text-sm focus:outline-none bg-transparent dark:text-gray-200"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-primary"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-600"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors flex items-center gap-2"
            >
              <User size={16} />
              {t?.forms?.login || 'Login'}
            </button>
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
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 flex flex-col gap-4 shadow-lg absolute w-full left-0 z-50">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`text-left text-base font-medium transition-colors hover:text-primary ${
                isActive(item.path) ? 'text-primary' : 'text-gray-600'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <div className="border-t border-gray-100 pt-4 flex flex-col gap-4">
             <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm flex items-center gap-2">
                  <Globe size={16} /> Language
                </span>
                <select
                  value={currentLanguage}
                  onChange={(e) => dispatch(setLanguage(e.target.value))}
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                </select>
             </div>

            {isLoggedIn ? (
              <>
                <button
                  onClick={() => handleNavClick('/dashboard')}
                  className="text-left text-base font-medium text-gray-600 hover:text-primary flex items-center gap-2"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="text-left text-base font-medium text-red-500 hover:text-red-600 flex items-center gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setShowLogin(true);
                  setIsMenuOpen(false);
                }}
                className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors w-full flex items-center justify-center gap-2"
              >
                <User size={18} />
                {t?.forms?.login || 'Login'}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
