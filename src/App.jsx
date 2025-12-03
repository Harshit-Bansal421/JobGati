import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import SkillAnalysis from './components/SkillAnalysis';
import GapIdentification from './components/GapIdentification';
import TrainingBridge from './components/TrainingBridge';
import JobMatching from './components/JobMatching';
import JobSeekerRegistration from './components/JobSeekerRegistration';
import BusinessRegistration from './components/BusinessRegistration';
import LoginModal from './components/LoginModal';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import KarmaAI from './components/KarmaAI';


function App() {
  const [language, setLanguage] = useState("en");
  const [activePage, setActivePage] = useState("home");
  const [activeSection, setActiveSection] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userSkills, setUserSkills] = useState([
    "Welding L2",
    "Digital Literacy L1",
    "Solar Panel Installation L1",
  ]);
  const [requiredSkills, setRequiredSkills] = useState([
    "Welding L3",
    "Solar Installation L2",
  ]);
  const [translations, setTranslations] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/translation.json')
      .then(response => response.json())
      .then(data => {
        setTranslations(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching translations:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const t = translations ? translations[language] : {};

  const handleSectionClick = (section) => {
    setActiveSection(section);
    // Scroll to the section
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    setActivePage("dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-dark font-sans">
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        language={language}
        setLanguage={setLanguage}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setShowLogin={setShowLogin}
        t={t}
      />

      <main className="grow">
        {activePage === "home" && (
          <div>
            <Hero t={t} setActivePage={setActivePage} handleSectionClick={handleSectionClick} />
            
            <div id="skill-analysis">
              <SkillAnalysis t={t.interactive.skillAnalysis} userSkills={userSkills} />
            </div>

            <div id="gap-identification">
              <GapIdentification t={t.interactive.gapIdentification} userSkills={userSkills} />
            </div>

            <div id="training-bridge">
              <TrainingBridge t={t.interactive.trainingBridge} />
            </div>

            <div id="job-matching">
              <JobMatching t={t.interactive.jobMatching} userSkills={userSkills} />
            </div>
          </div>
        )}

        {activePage === "jobSeekerRegistration" && (
          <JobSeekerRegistration
            t={t}
            userSkills={userSkills}
            setUserSkills={setUserSkills}
            setActivePage={setActivePage}
          />
        )}

        {activePage === "businessRegistration" && (
          <BusinessRegistration
            t={t}
            requiredSkills={requiredSkills}
            setRequiredSkills={setRequiredSkills}
          />
        )}

        {activePage === "login" && (
          <LoginPage setActivePage={setActivePage} />
        )}

        {activePage === "dashboard" && isLoggedIn && (
          <Dashboard t={t.dashboard} />
        )}
      </main>

      <Footer setActivePage={setActivePage} />

      <KarmaAI />

      {showLogin && (
        <LoginModal
          t={t.forms}
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}

export default App;
