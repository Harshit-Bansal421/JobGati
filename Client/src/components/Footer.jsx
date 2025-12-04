/**
 * Footer Component - Site Footer
 * 
 * This is the global footer displayed at the bottom of every page.
 * Contains company information, quick navigation links, contact details,
 * social media links, and copyright notice.
 */

// Import React library
import React from 'react';

// Import Link for client-side navigation
import { Link } from 'react-router-dom';

/**
 * Footer functional component
 * Renders the site footer with multi-column layout
 */
const Footer = () => {
  return (
    // Footer container - dark background with transitions for theme changes
    // bg-dark (custom dark color) in light mode, even darker in dark mode
    <footer className="bg-dark dark:bg-gray-950 text-white py-12 pb-5 transition-colors">
      {/* Content wrapper - max width container with horizontal padding */}
      <div className="container mx-auto px-5">
        {/* Footer columns grid - responsive, auto-fit layout
            - Each column minimum 200px wide
            - Columns grow to fill available space evenly */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10 mb-10">
          
          {/* Column 1: Company branding and tagline */}
          <div className="footer-column">
            {/* Company name/logo */}
            <h3 className="text-lg mb-5 text-white font-bold">JobGati</h3>
            {/* Company tagline/description */}
            <p>AI-Powered Hyperlocal Skill-to-Job Match Platform</p>
          </div>
          
          {/* Column 2: Quick navigation links */}
          <div className="footer-column">
            {/* Column heading */}
            <h3 className="text-lg mb-5 text-white font-bold">Quick Links</h3>
            {/* Navigation links list - unstyled list */}
            <ul className="list-none">
              {/* Home link */}
              <li className="mb-2.5">
                <Link to="/" className="text-gray-400 no-underline transition-colors duration-300 hover:text-white">
                  Home
                </Link>
              </li>
              
              {/* Job Seekers page link */}
              <li className="mb-2.5">
                <Link
                  to="/register-seeker"
                  className="text-gray-400 no-underline transition-colors duration-300 hover:text-white"
                >
                  For Job Seekers
                </Link>
              </li>
              
              {/* Businesses page link */}
              <li className="mb-2.5">
                <Link
                  to="/register-business"
                  className="text-gray-400 no-underline transition-colors duration-300 hover:text-white"
                >
                  For Businesses
                </Link>
              </li>
              
              {/* About Us link - placeholder (#) for future implementation */}
              <li className="mb-2.5">
                <Link to="#" className="text-gray-400 no-underline transition-colors duration-300 hover:text-white">
                  About Us
                </Link>
              </li>
              
              {/* Contact link - placeholder (#) for future implementation */}
              <li className="mb-2.5">
                <Link to="#" className="text-gray-400 no-underline transition-colors duration-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Contact information */}
          <div className="footer-column">
            {/* Column heading */}
            <h3 className="text-lg mb-5 text-white font-bold">Contact Us</h3>
            {/* Contact details list - unstyled list */}
            <ul className="list-none">
              {/* Email address */}
              <li className="mb-2.5 text-gray-400">Email: info@jobgati.com</li>
              
              {/* Phone number - Indian format */}
              <li className="mb-2.5 text-gray-400">Phone: +91 9876543210</li>
              
              {/* Physical address */}
              <li className="mb-2.5 text-gray-400">
                Address: Skill Development Center, New Delhi, India
              </li>
            </ul>
          </div>
          
          {/* Column 4: Social media links */}
          <div className="footer-column">
            {/* Column heading */}
            <h3 className="text-lg mb-5 text-white font-bold">Follow Us</h3>
            {/* Social media links list - unstyled list */}
            <ul className="list-none">
              {/* Facebook link - placeholder (#) for future implementation */}
              <li className="mb-2.5">
                <a href="#" className="text-gray-400 no-underline transition-colors duration-300 hover:text-white">Facebook</a>
              </li>
              
              {/* Twitter link - placeholder (#) for future implementation */}
              <li className="mb-2.5">
                <a href="#" className="text-gray-400 no-underline transition-colors duration-300 hover:text-white">Twitter</a>
              </li>
              
              {/* LinkedIn link - placeholder (#) for future implementation */}
              <li className="mb-2.5">
                <a href="#" className="text-gray-400 no-underline transition-colors duration-300 hover:text-white">LinkedIn</a>
              </li>
              
              {/* Instagram link - placeholder (#) for future implementation */}
              <li className="mb-2.5">
                <a href="#" className="text-gray-400 no-underline transition-colors duration-300 hover:text-white">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright section - bottom of footer with top border */}
        <div className="text-center pt-5 border-t border-gray-700 text-gray-400 text-sm">
          {/* Copyright notice - using HTML entity &copy; for © symbol */}
          <p>&copy; 2025 JobGati. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Export Footer component as default export
export default Footer;
