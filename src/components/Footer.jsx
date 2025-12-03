import React from 'react';

const Footer = ({ setActivePage }) => {
  return (
    <footer className="bg-dark text-white py-12 pb-5">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10 mb-10">
          <div className="footer-column">
            <h3 className="text-lg mb-5 text-white font-bold">JobGati</h3>
            <p>AI-Powered Hyperlocal Skill-to-Job Match Platform</p>
          </div>
          <div className="footer-column">
            <h3 className="text-lg mb-5 text-white font-bold">Quick Links</h3>
            <ul className="list-none">
              <li className="mb-2.5">
                <a href="#" onClick={(e) => { e.preventDefault(); setActivePage("home"); }} className="text-gray-400 no-underline transition-colors duration-300 hover:text-white">
                  Home
                </a>
              </li>
              <li className="mb-2.5">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setActivePage("jobSeekerRegistration"); }}
                  className="text-gray-400 no-underline transition-colors duration-300 hover:text-white"
                >
                  For Job Seekers
                </a>
              </li>
              <li className="mb-2.5">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setActivePage("businessRegistration"); }}
                  className="text-gray-400 no-underline transition-colors duration-300 hover:text-white"
                >
                  For Businesses
                </a>
              </li>
              <li className="mb-2.5">
                <a href="#" onClick={(e) => { e.preventDefault(); setActivePage("about"); }} className="text-gray-400 no-underline transition-colors duration-300 hover:text-white">
                  About Us
                </a>
              </li>
              <li className="mb-2.5">
                <a href="#" onClick={(e) => { e.preventDefault(); setActivePage("contact"); }} className="text-gray-400 no-underline transition-colors duration-300 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3 className="text-lg mb-5 text-white font-bold">Contact Us</h3>
            <ul className="list-none">
              <li className="mb-2.5 text-gray-400">Email: info@jobgati.com</li>
              <li className="mb-2.5 text-gray-400">Phone: +91 9876543210</li>
              <li className="mb-2.5 text-gray-400">
                Address: Skill Development Center, New Delhi, India
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3 className="text-lg mb-5 text-white font-bold">Follow Us</h3>
            <ul className="list-none">
              <li className="mb-2.5">
                <a href="#" className="text-gray-400 no-underline transition-colors duration-300 hover:text-white">Facebook</a>
              </li>
              <li className="mb-2.5">
                <a href="#" className="text-gray-400 no-underline transition-colors duration-300 hover:text-white">Twitter</a>
              </li>
              <li className="mb-2.5">
                <a href="#" className="text-gray-400 no-underline transition-colors duration-300 hover:text-white">LinkedIn</a>
              </li>
              <li className="mb-2.5">
                <a href="#" className="text-gray-400 no-underline transition-colors duration-300 hover:text-white">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center pt-5 border-t border-gray-700 text-gray-400 text-sm">
          <p>&copy; 2025 JobGati. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
