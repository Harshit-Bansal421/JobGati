import React, { useState } from 'react';

const BusinessRegistration = ({ t, requiredSkills, setRequiredSkills }) => {
  const [newRequiredSkill, setNewRequiredSkill] = useState("");

  const handleAddRequiredSkill = (e) => {
    if (e.key === "Enter" && newRequiredSkill.trim()) {
      setRequiredSkills([...requiredSkills, newRequiredSkill.trim()]);
      setNewRequiredSkill("");
    }
  };

  const handleRemoveRequiredSkill = (index) => {
    const updatedSkills = [...requiredSkills];
    updatedSkills.splice(index, 1);
    setRequiredSkills(updatedSkills);
  };

  const handleRegisterBusiness = async () => {
    // Simulate registration
    alert("Business registered!");
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-5">
        <div className="max-w-[800px] mx-auto bg-white rounded-lg p-10 shadow-sm">
          <h2 className="text-3xl font-bold mb-8 text-center">{t.forms.businessReg}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <div className="mb-5">
                <label htmlFor="business-name" className="block mb-2 font-medium">{t.forms.businessName}</label>
                <input type="text" id="business-name" className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100" />
              </div>
              <div className="mb-5">
                <label htmlFor="industry" className="block mb-2 font-medium">{t.forms.industry}</label>
                <select id="industry" className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100">
                  {t.forms.industryOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="mb-5">
                <label htmlFor="location" className="block mb-2 font-medium">{t.forms.location}</label>
                <input type="text" id="location" className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100" />
              </div>
              <div className="mb-5">
                <label htmlFor="contact-person" className="block mb-2 font-medium">{t.forms.contactPerson}</label>
                <input type="text" id="contact-person" className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100" />
              </div>
              <div className="mb-5">
                <button
                  className="bg-primary text-white hover:bg-blue-600 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300"
                  onClick={handleRegisterBusiness}
                >
                  {t.forms.registerBusiness}
                </button>
                <button
                  className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300 ml-2.5"
                >
                  {t.forms.login}
                </button>
              </div>
            </div>
            <div>
              <div className="mb-5 col-span-1 md:col-span-2">
                <label htmlFor="job-positions" className="block mb-2 font-medium">{t.forms.jobPositions}</label>
                <textarea
                  id="job-positions"
                  rows="4"
                  placeholder={t.forms.jobPositionsPlaceholder}
                  className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                ></textarea>
              </div>
              <div className="mb-5">
                <label htmlFor="required-skills" className="block mb-2 font-medium">{t.forms.requiredSkills}</label>
                <input
                  type="text"
                  id="required-skills"
                  placeholder={t.forms.requiredSkillsPlaceholder}
                  value={newRequiredSkill}
                  onChange={(e) => setNewRequiredSkill(e.target.value)}
                  onKeyPress={handleAddRequiredSkill}
                  className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                />
                <div className="flex flex-wrap gap-2.5 mt-5">
                  {requiredSkills.map((skill, index) => (
                    <span key={index} className="bg-blue-50 text-primary px-3 py-1 rounded-[20px] text-sm font-medium">
                      {skill}
                      <span
                        className="ml-1.5 cursor-pointer"
                        onClick={() => handleRemoveRequiredSkill(index)}
                      >
                        ×
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessRegistration;
