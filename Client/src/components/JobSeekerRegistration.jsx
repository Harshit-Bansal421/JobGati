import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../store/slices/authSlice';
import { Plus, Trash2, Upload, FileText, Briefcase } from 'lucide-react';
import './../index.css';
import { createJobSeeker } from '../services/JobSeekerSeeker';

const JobSeekerRegistration = () => {
  const [newSkill, setNewSkill] = useState("");
  const [newExperience, setNewExperience] = useState({ role: "", company: "", duration: "" });
  const errorRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    education: "",
    location: "",
    aadhar: "",
    skills: [],
    experience: [],
    resume: "",
    certificates: []
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux selectors
  const { currentLanguage, translations } = useSelector((state) => state.language);

  const t = translations[currentLanguage] || {};

  //handleinputchange handle all data except skills, experience, resume, certificates
  const handleInputChange = (e) => {
    const { id, value } = e.target;

    const keyMap = {
      "name": "name",
      "phone": "phone",
      "age": "age",
      "education": "education",
      "location": "location",
      "aadhar-number": "aadhar"
    };

    const stateKey = keyMap[id] || id;
    setFormData(prev => ({ ...prev, [stateKey]: value }));

    if (error) setError("");
    localStorage.setItem("formData", JSON.stringify(formData));

  };

  const handleAddSkill = (e) => {
    if (e.key === "Enter" && newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };


  const handleAddExperience = () => {
    if (newExperience.role && newExperience.company && newExperience.duration) {
      setFormData(prev => ({ ...prev, experience: [...prev.experience, newExperience] }));
      setNewExperience({ role: "", company: "", duration: "" });
    }
  };

  const handleRemoveExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        resume: file
      }))
    }
  };

const handleCertificateUpload = (e) => {
  const files = Array.from(e.target.files);

  setFormData(prev => ({
    ...prev,
    certificates: [...prev.certificates, ...files]
  }));
};

const handleRemoveCertificate = (index) => {  
  setFormData(prev => ({
    ...prev,
    certificates: prev.certificates.filter((_, i) => i !== index)
  }));
};

const handleRegisterJobSeeker = () => {
  if (!formData.name || !formData.phone || !formData.age || !formData.education || !formData.aadhar) {
    setError("Please fill in all required fields.");
    errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const phoneRegex = /^[1-9]\d{9}$/;
  if (!phoneRegex.test(formData.phone)) {
    setError("Phone number must be 10 digits and cannot start with 0.");
    return;
  }

  const aadharRegex = /^[1-9][0-9]{11}$/;
  if (!aadharRegex.test(formData.aadhar)) {
    setError("Aadhar number must be 12 digits and cannot start with 0.");
    return;
  }

  // 🔥 IMPORTANT FIX: File objects removed, only names sent
  const finalData = {
    name: formData.name,
    phone: formData.phone,
    age: formData.age,
    education: formData.education,
    location: formData.location,
    aadhar: formData.aadhar,
    skills: formData.skills,
    experience: formData.experience,
    resume: formData.resume ? formData.resume.name : "",
    certificates: formData.certificates.map(c => c.name)
  };

  console.log("FINAL DATA SENT:", finalData);  // 🔥 Now backend will receive valid JSON

  createJobSeeker(finalData)
   .then(res => {
      console.log("SERVER RESPONSE:", res);
      dispatch(register({ data: finalData, type: "jobseeker" }));
      navigate("/login");
    })
    .catch(err => {
      console.log("SERVER ERROR:", err);
      setError("Server error! Check backend logs.");
    });
  dispatch(register({ data: finalData, type: "jobseeker" }));
  navigate("/login");
};


  if (!t.forms) return null;

  return (
    <section className="py-20 dark:bg-gray-900">
      <div className="container mx-auto px-5">
        <div className="max-w-[900px] mx-auto bg-white dark:bg-gray-800 rounded-lg p-6 md:p-8 lg:p-10 shadow-sm">
          <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">{t.forms.join}</h2>

          {error && (
            <div ref={errorRef} className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 text-center" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Column: Personal Info & Skills */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b dark:text-gray-200 dark:border-gray-600 pb-2">Personal Information</h3>

              {/** Name input */}
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

              {/** Age input */}
              <div className="mb-5">
                <label htmlFor="age" className="block mb-2 font-medium dark:text-gray-200">{t.forms.age}</label>
                <input
                  type="number"
                  id="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 no-spinner"
                />
              </div>

              {/** Education input */}
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

              {/** Aadhar input */}
              <div className="mb-5">
                <label htmlFor="aadhar" className="block mb-2 font-medium dark:text-gray-200">{t.forms.aadhar}</label>
                <input
                  type="number"
                  id="aadhar"
                  value={formData.aadhar}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 no-spinner"
                />
              </div>

              {/** phone number */}
              <div className="mb-5">
                <label htmlFor="phone" className="block mb-2 font-medium dark:text-gray-200">{t.forms.phone}</label>
                <input
                  type="number"
                  id="phone"
                  maxLength={12}
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 no-spinner"
                />
              </div>

              {/** Skills input */}
              <h3 className="text-xl font-semibold mb-4 mt-8 text-gray-700 dark:text-gray-200 border-b dark:border-gray-600 pb-2">Skills</h3>
              <div className="mb-5">
                <label htmlFor="skills" className="block mb-2 font-medium dark:text-gray-200">{t.forms.skills}</label>
                <input
                  type="text"
                  id="skills"
                  placeholder={t.forms.skillsPlaceholder}
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={handleAddSkill}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-base transition-colors duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                />
                <div className="flex flex-wrap gap-2.5 mt-5">
                  {formData.skills.map((skill, index) => (
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
                    onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    className="p-2 border dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded text-sm"
                    value={newExperience.company}
                    onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Duration (e.g. 2 years)"
                    className="p-2 border dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded text-sm no-spinner"
                    value={newExperience.duration}
                    onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
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
              {formData.experience.length > 0 && (
                <div className="mb-8 space-y-3">
                  {formData.experience.map((exp, index) => (
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
                    accept="image/*,.pdf,.doc,.docx"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleResumeUpload}
                  />
                  <div className="flex flex-col items-center">
                    <FileText className="w-8 h-8 text-gray-400 mb-2 group-hover:text-primary" />
                    <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-primary">
                      {formData.resume ? formData.resume.name : "Upload Resume (PDF, DOC)"}
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
                    accept="image/*,.pdf,.doc,.docx"
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
                {Array.from(formData.certificates).length > 0 && (
                  <div className="mt-4 space-y-2">
                    {Array.from(formData.certificates).map((cert, index) => (
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

            </div>
          </div>

          <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
            <button
              className="bg-secondary text-white hover:bg-orange-600 px-8 py-3 rounded-md font-semibold cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={handleRegisterJobSeeker}
            >
              {t.forms.register}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default JobSeekerRegistration;
