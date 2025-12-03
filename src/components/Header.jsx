import React, { useState } from 'react';

const Header = ({
  activePage,
  setActivePage,
  language,
  setLanguage,
  isLoggedIn,
  setIsLoggedIn,
  setShowLogin,
  t
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t?.nav?.home || 'Home' },
    { id: 'jobSeekerRegistration', label: t?.nav?.forJobSeekers || 'For Job Seekers' },
    { id: 'businessRegistration', label: t?.nav?.forBusinesses || 'For Businesses' },
    { id: 'about', label: t?.nav?.about || 'About' }, // Assuming 'about' page exists or is a placeholder
    { id: 'contact', label: t?.nav?.contact || 'Contact' }, // Assuming 'contact' page exists or is a placeholder
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="text-2xl font-bold text-primary cursor-pointer flex items-center gap-2"
          onClick={() => setActivePage('home')}
        >
          <span>JobGati</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activePage === item.id ? 'text-primary' : 'text-gray-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Actions (Language & Login) */}
        <div className="hidden md:flex items-center gap-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActivePage('dashboard')}
                className="text-sm font-medium text-gray-600 hover:text-primary"
              >
                Dashboard
              </button>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="text-sm font-medium text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              {t?.forms?.login || 'Login'}
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 flex flex-col gap-4 shadow-lg absolute w-full left-0">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-left text-base font-medium transition-colors hover:text-primary ${
                activePage === item.id ? 'text-primary' : 'text-gray-600'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <div className="border-t border-gray-100 pt-4 flex flex-col gap-4">
             <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">Language</span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                </select>
             </div>

            {isLoggedIn ? (
              <>
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="text-left text-base font-medium text-gray-600 hover:text-primary"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="text-left text-base font-medium text-red-500 hover:text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setShowLogin(true);
                  setIsMenuOpen(false);
                }}
                className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors w-full"
              >
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
