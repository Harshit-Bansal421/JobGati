import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setUserSkills, 
  addExperience, 
  removeExperience, 
  setResume, 
  addCertificate, 
  removeCertificate 
} from '../store/slices/userSlice';
import { login } from '../store/slices/authSlice';
import { Plus, Trash2, Upload, FileText, Briefcase } from 'lucide-react';

const JobSeekerRegistration = () => {
  const [newSkill, setNewSkill] = useState("");
  // Local state for new experience entry
  const [newExperience, setNewExperience] = useState({ role: "", company: "", duration: "" });
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    education: ""
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentLanguage, translations } = useSelector((state) => state.language);
  const { skills, experience, resume, certificates } = useSelector((state) => state.user);
  
  const t = translations[currentLanguage] || {};

  // --- Form Handlers ---
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (error) setError(""); // Clear error on change
  };

  // --- Skills Handlers ---
  const handleAddSkill = (e) => {
    if (e.key === "Enter" && newSkill.trim()) {
      dispatch(setUserSkills([...skills, newSkill.trim()]));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    dispatch(setUserSkills(updatedSkills));
  };

  // --- Experience Handlers ---
  const handleAddExperience = () => {
    if (newExperience.role && newExperience.company) {
      dispatch(addExperience(newExperience));
      setNewExperience({ role: "", company: "", duration: "" });
    }
  };

  const handleRemoveExperience = (index) => {
    dispatch(removeExperience(index));
  };

  // --- File Upload Handlers ---
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you'd upload this to a server. 
      // Here we store the name for display.
      dispatch(setResume({ name: file.name, size: file.size }));
    }
  };

  const handleCertificateUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      dispatch(addCertificate({ name: file.name, size: file.size }));
    });
  };

  const handleRemoveCertificate = (index) => {
    dispatch(removeCertificate(index));
  };

  const handleRegisterJobSeeker = async () => {
    // Validation
    if (!formData.name || !formData.age || !formData.education) {
      setError("Please fill in all personal information fields.");
      return;
    }
    if (skills.length === 0) {
      setError("Please add at least one skill.");
      return;
    }
    // Check if user has added experience OR uploaded a resume OR added certificates
    // This ensures they have provided "necessary info"
    if (experience.length === 0 && !resume && certificates.length === 0) {
      setError("Please add work experience, upload a resume, or add a certificate.");
      return;
    }

    // Simulate registration and login
    dispatch(login({ name: formData.name, role: "seeker" }));
    alert("Registered successfully!");
    navigate("/dashboard");
  };

  if (!t.forms) return null;

  return (
    <section className="py-20 dark:bg-gray-900">
      <div className="container mx-auto px-5">
        <div className="max-w-[900px] mx-auto bg-white dark:bg-gray-800 rounded-lg p-6 md:p-8 lg:p-10 shadow-sm">
          <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">{t.forms.join}</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 text-center" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Column: Personal Info & Skills */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200 border-b dark:border-gray-600 pb-2">Personal Information</h3>
              <div className="mb-5">
                <label htmlFor="name" className="block mb-2 font-medium dark:text-gray-200">{t.forms.fullName}</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100" 
                />
              </div>
              <div className="mb-5">
                <label htmlFor="age" className="block mb-2 font-medium dark:text-gray-200">{t.forms.age}</label>
                <input 
                  type="number" 
                  id="age" 
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100" 
                />
              </div>
              <div className="mb-5">
                <label htmlFor="education" className="block mb-2 font-medium dark:text-gray-200">{t.forms.education}</label>
                <select 
                  id="education" 
                  value={formData.education}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Education</option>
                  {t.forms.educationOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <h3 className="text-xl font-semibold mb-4 mt-8 text-gray-700 dark:text-gray-200 border-b dark:border-gray-600 pb-2">Skills</h3>
              <div className="mb-5">
                <label htmlFor="skills" className="block mb-2 font-medium dark:text-gray-200">{t.forms.skills}</label>
                <input
                  type="text"
                  id="skills"
                  placeholder={t.forms.skillsPlaceholder}
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={handleAddSkill}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                />
                <div className="flex flex-wrap gap-2.5 mt-5">
                  {skills.map((skill, index) => (
                    <span key={index} className="bg-blue-50 dark:bg-blue-900 text-primary dark:text-blue-300 px-3 py-1 rounded-[20px] text-sm font-medium flex items-center gap-1">
                      {skill}
                      <span
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => handleRemoveSkill(index)}
                      >
                        ×
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Experience & Documents */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200 border-b dark:border-gray-600 pb-2">Experience</h3>
              <div className="mb-5 bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                <div className="grid grid-cols-1 gap-3 mb-3">
                  <input 
                    type="text" 
                    placeholder="Role (e.g. Welder)" 
                    className="p-2 border dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded text-sm"
                    value={newExperience.role}
                    onChange={(e) => setNewExperience({...newExperience, role: e.target.value})}
                  />
                  <input 
                    type="text" 
                    placeholder="Company" 
                    className="p-2 border dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded text-sm"
                    value={newExperience.company}
                    onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                  />
                  <input 
                    type="text" 
                    placeholder="Duration (e.g. 2 years)" 
                    className="p-2 border dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded text-sm"
                    value={newExperience.duration}
                    onChange={(e) => setNewExperience({...newExperience, duration: e.target.value})}
                  />
                </div>
                <button 
                  onClick={handleAddExperience}
                  className="w-full bg-white dark:bg-gray-600 border border-primary dark:border-blue-400 text-primary dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-500 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Add Experience
                </button>
              </div>

              {/* Experience List */}
              {experience.length > 0 && (
                <div className="mb-8 space-y-3">
                  {experience.map((exp, index) => (
                    <div key={index} className="flex justify-between items-start bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 p-3 rounded-md shadow-sm">
                      <div>
                        <h4 className="font-semibold text-dark dark:text-white">{exp.role}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{exp.company} • {exp.duration}</p>
                      </div>
                      <button 
                        onClick={() => handleRemoveExperience(index)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200 border-b dark:border-gray-600 pb-2">Documents</h3>
              
              {/* Resume Upload */}
              <div className="mb-6">
                <label className="block mb-2 font-medium dark:text-gray-200">Resume / CV</label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md p-6 text-center cursor-pointer transition-colors duration-300 hover:border-primary hover:bg-blue-50 dark:hover:bg-gray-600 relative group">
                  <input 
                    type="file" 
                    accept=".pdf,.doc,.docx" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleResumeUpload}
                  />
                  <div className="flex flex-col items-center">
                    <FileText className="w-8 h-8 text-gray-400 mb-2 group-hover:text-primary" />
                    <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-primary">
                      {resume ? resume.name : "Upload Resume (PDF, DOC)"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Certificates Upload */}
              <div className="mb-5">
                <label className="block mb-2 font-medium dark:text-gray-200">{t.forms.certifications}</label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md p-6 text-center cursor-pointer transition-colors duration-300 hover:border-primary hover:bg-blue-50 dark:hover:bg-gray-600 relative group">
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*,.pdf"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleCertificateUpload}
                  />
                  <div className="flex flex-col items-center">
                    <Upload className="w-8 h-8 text-gray-400 mb-2 group-hover:text-primary" />
                    <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-primary">
                      {t.forms.uploadText}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">{t.forms.maxSize}</p>
                  </div>
                </div>

                {/* Certificates List */}
                {certificates.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {certificates.map((cert, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-50 dark:bg-gray-600 p-2 rounded text-sm">
                        <span className="truncate max-w-[200px] dark:text-gray-200">{cert.name}</span>
                        <button 
                          onClick={() => handleRemoveCertificate(index)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-4 text-center mt-5">
                <div className="flex items-center justify-center gap-2 mb-2">
                   <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3.93-3.09 7.15-7.3 7.97V21h4v-2h-4v-1.03c-3.2-.82-5.7-3.67-5.7-6.97H3c0 4.84 3.96 8.5 8.99 9V21h-4v2h10v-2h-4v-1.01c4.99-.48 9-4.78 9-9.99h-2z"></path></svg>
                   </div>
                   <span className="font-medium text-sm dark:text-gray-200">{t.forms.accessibility}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">{t.forms.voiceInput}</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
            <button
              className="bg-secondary text-white hover:bg-orange-600 px-8 py-3 rounded-md font-semibold cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={handleRegisterJobSeeker}
            >
              {t.forms.register}
            </button>
            <button
              onClick={() => navigate('/login')}
              className="bg-white dark:bg-gray-700 border border-primary dark:border-blue-400 text-primary dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-600 px-8 py-3 rounded-md font-semibold cursor-pointer transition-all duration-300"
            >
              {t.forms.login}
            </button>
          </div>
          
          <div className="text-center mt-4">
            <a href="#" className="text-primary text-sm hover:underline">
              {t.forms.forgotPassword}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobSeekerRegistration;
