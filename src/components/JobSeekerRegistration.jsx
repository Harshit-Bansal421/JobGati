import React, { useState } from 'react';

const JobSeekerRegistration = ({ t, userSkills, setUserSkills, setActivePage }) => {
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = (e) => {
    if (e.key === "Enter" && newSkill.trim()) {
      setUserSkills([...userSkills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...userSkills];
    updatedSkills.splice(index, 1);
    setUserSkills(updatedSkills);
  };

  const handleRegisterJobSeeker = async () => {
    // Simulate registration
    alert("Registered successfully!");
    setActivePage("dashboard");
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-5">
        <div className="max-w-[800px] mx-auto bg-white rounded-lg p-10 shadow-sm">
          <h2 className="text-3xl font-bold mb-8 text-center">{t.forms.join}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <div className="mb-5">
                <label htmlFor="name" className="block mb-2 font-medium">{t.forms.fullName}</label>
                <input type="text" id="name" className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100" />
              </div>
              <div className="mb-5">
                <label htmlFor="age" className="block mb-2 font-medium">{t.forms.age}</label>
                <input type="number" id="age" className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100" />
              </div>
              <div className="mb-5">
                <label htmlFor="education" className="block mb-2 font-medium">{t.forms.education}</label>
                <select id="education" className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100">
                  {t.forms.educationOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="mb-5">
                <label htmlFor="skills" className="block mb-2 font-medium">{t.forms.skills}</label>
                <input
                  type="text"
                  id="skills"
                  placeholder={t.forms.skillsPlaceholder}
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={handleAddSkill}
                  className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                />
                <div className="flex flex-wrap gap-2.5 mt-5">
                  {userSkills.map((skill, index) => (
                    <span key={index} className="bg-blue-50 text-primary px-3 py-1 rounded-[20px] text-sm font-medium">
                      {skill}
                      <span
                        className="ml-1.5 cursor-pointer"
                        onClick={() => handleRemoveSkill(index)}
                      >
                        ×
                      </span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-5">
                <button
                  className="bg-secondary text-white hover:bg-orange-600 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300"
                  onClick={handleRegisterJobSeeker}
                >
                  {t.forms.register}
                </button>
                <button
                  className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300 ml-2.5"
                >
                  {t.forms.login}
                </button>
              </div>
              <a href="#" className="text-primary no-underline">
                {t.forms.forgotPassword}
              </a>
            </div>
            <div>
              <div className="mb-5">
                <label className="block mb-2 font-medium">{t.forms.certifications}</label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center cursor-pointer transition-colors duration-300 hover:border-primary">
                  <svg
                    className="w-10 h-10 text-gray-500 mb-2.5 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <div>
                    <span>{t.forms.uploadText}</span>
                    <input type="file" className="sr-only" multiple />
                  </div>
                  <p>{t.forms.maxSize}</p>
                </div>
              </div>
              <div className="bg-yellow-100 rounded-lg p-5 text-center mt-5">
                <p>{t.forms.accessibility}</p>
                <div className="w-[60px] h-[60px] rounded-full bg-secondary text-white flex items-center justify-center mx-auto mb-2.5 cursor-pointer">
                  <svg
                    className="w-[30px] h-[30px]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3.93-3.09 7.15-7.3 7.97V21h4v-2h-4v-1.03c-3.2-.82-5.7-3.67-5.7-6.97H3c0 4.84 3.96 8.5 8.99 9V21h-4v2h10v-2h-4v-1.01c4.99-.48 9-4.78 9-9.99h-2z"></path>
                  </svg>
                </div>
                <p>{t.forms.voiceInput}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobSeekerRegistration;
