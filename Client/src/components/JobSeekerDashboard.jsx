import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData } from '../store/slices/userSlice';
import {
  User, MapPin, Phone, Mail, FileText, Briefcase,
  GraduationCap, Award, TrendingUp, X, Save, Edit2, Plus, Trash2
} from 'lucide-react';

const JobSeekerDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userData = useSelector((state) => state.user.data);

  // Combine user data from auth and user slices
  const profileData = { ...user, ...userData };

  // State management
  const [modalType, setModalType] = useState(null);
  const [tempData, setTempData] = useState({});

  // Mock data for display (will be replaced by real data from Redux/API)
  const profileViews = 128;
  const learningProgress = 65;
  const recentApplications = [
    { title: "Welder at ABC Corp", status: "Viewed by Recruiter", statusColor: "text-yellow-400" },
    { title: "Electrician at XYZ Ltd", status: "Interview Invite", statusColor: "text-green-400" },
    { title: "Technician at BuildCo", status: "Application Sent", statusColor: "text-blue-400" },
  ];
  const recommendedJobs = [
    { title: "Senior Solar Technician", company: "SunPower Solutions" },
    { title: "Electrical Installation Expert", company: "Grid Systems Inc" },
    { title: "Maintenance Specialist", company: "Urban Infrastructure" },
  ];

  // Get skills from userData or use defaults
  const skills = profileData?.skills || [
    "Solar Panel Installation L1",
    "Electrical Wiring",
    "Safety Compliance",
    "Team Coordination",
    "Blueprint Reading"
  ];

  // Handler functions
  const openEditProfile = () => {
    setTempData({
      name: profileData?.name || 'Rajesh Kumar',
      username: profileData?.username || 'rajesh.kumar',
      location: profileData?.location || 'Mumbai, Maharashtra',
      phone: profileData?.phone || '+91 98765 43210',
      email: profileData?.email || 'rajesh.kumar@email.com',
      age: profileData?.age || '32',
      aadhaar: profileData?.aadhaar || 'XXXX XXXX 4567',
      education: profileData?.education || 'ITI - Electrician Trade',
      skills: profileData?.skills || skills,
      jobTarget: profileData?.jobTarget || 'Full-time position in Solar Installation & Electrical Maintenance',
    });
    setModalType('editProfile');
  };

  const handleSaveProfile = () => {
    // Dispatch to Redux
    dispatch(updateUserData(tempData));

    // TODO: Add API call to backend to persist changes
    // Example: await updateUserProfile(tempData);

    setModalType(null);
    setTempData({});
  };

  const handleAddSkill = () => {
    const newSkill = prompt("Enter new skill:");
    if (newSkill && newSkill.trim()) {
      setTempData({
        ...tempData,
        skills: [...(tempData.skills || []), newSkill.trim()]
      });
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = tempData.skills.filter((_, idx) => idx !== index);
    setTempData({ ...tempData, skills: updatedSkills });
  };

  // Helper styles
  const isDarkMode = true; // Using dark mode by default to match design
  const inputContainerClass = "mb-4";
  const labelClass = `block text-xs uppercase font-bold mb-1 tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`;
  const inputClass = `w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-600' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'}`;
  const modalOverlayClass = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn";
  const modalContainerClass = `rounded-2xl w-full max-w-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`;
  const modalHeaderClass = `flex justify-between items-center p-4 border-b ${isDarkMode ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-slate-50'}`;
  const buttonBaseClass = "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 w-full";

  return (
    <div className="bg-[#1a202c] min-h-screen text-white p-4 md:p-6 font-sans">
      <div className="container mx-auto max-w-7xl">

        {/* --- MODAL: EDIT PROFILE --- */}
        {modalType === 'editProfile' && (
          <div className={modalOverlayClass}>
            <div className={modalContainerClass}>
              <div className={modalHeaderClass}>
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Edit Profile</h3>
                <button onClick={() => setModalType(null)} className={`p-1 rounded-full ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'}`}>
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto custom-scrollbar">

                {/* Personal Information Section */}
                <h4 className="text-blue-500 text-sm font-bold uppercase tracking-wider mb-4 border-b border-opacity-20 border-slate-500 pb-2 flex items-center gap-2">
                  Personal Information
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={inputContainerClass}>
                    <label className={labelClass}>Name</label>
                    <input
                      type="text"
                      value={tempData.name || ''}
                      onChange={e => setTempData({ ...tempData, name: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className={inputContainerClass}>
                    <label className={labelClass}>Username</label>
                    <input
                      type="text"
                      value={tempData.username || ''}
                      onChange={e => setTempData({ ...tempData, username: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className={inputContainerClass}>
                    <label className={labelClass}>Location</label>
                    <input
                      type="text"
                      value={tempData.location || ''}
                      onChange={e => setTempData({ ...tempData, location: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className={inputContainerClass}>
                    <label className={labelClass}>Phone</label>
                    <input
                      type="text"
                      value={tempData.phone || ''}
                      onChange={e => setTempData({ ...tempData, phone: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className={inputContainerClass}>
                    <label className={labelClass}>Email</label>
                    <input
                      type="email"
                      value={tempData.email || ''}
                      onChange={e => setTempData({ ...tempData, email: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Additional Details Section */}
                <h4 className="text-blue-500 text-sm font-bold uppercase tracking-wider mb-4 mt-6 border-b border-opacity-20 border-slate-500 pb-2 flex items-center gap-2">
                  Additional Details
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={inputContainerClass}>
                    <label className={labelClass}>Age</label>
                    <input
                      type="number"
                      value={tempData.age || ''}
                      onChange={e => setTempData({ ...tempData, age: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className={inputContainerClass}>
                    <label className={labelClass}>Aadhaar Number</label>
                    <input
                      type="text"
                      value={tempData.aadhaar || ''}
                      onChange={e => setTempData({ ...tempData, aadhaar: e.target.value })}
                      placeholder="XXXX XXXX XXXX"
                      className={inputClass}
                    />
                  </div>
                  <div className={`${inputContainerClass} md:col-span-2`}>
                    <label className={labelClass}>Highest Education</label>
                    <input
                      type="text"
                      value={tempData.education || ''}
                      onChange={e => setTempData({ ...tempData, education: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Skills Section */}
                <h4 className="text-blue-500 text-sm font-bold uppercase tracking-wider mb-4 mt-6 border-b border-opacity-20 border-slate-500 pb-2 flex items-center gap-2">
                  Skills
                </h4>

                <div className={inputContainerClass}>
                  <label className={labelClass}>Your Skills</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tempData.skills && tempData.skills.map((skill, idx) => (
                      <span key={idx} className="bg-blue-600/20 border border-blue-500/30 text-blue-300 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                        {skill}
                        <button
                          onClick={() => handleRemoveSkill(idx)}
                          className="hover:text-red-400 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={handleAddSkill}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    <Plus size={16} /> Add Skill
                  </button>
                </div>

                {/* Job Preferences Section */}
                <h4 className="text-blue-500 text-sm font-bold uppercase tracking-wider mb-4 mt-6 border-b border-opacity-20 border-slate-500 pb-2 flex items-center gap-2">
                  Job Preferences
                </h4>

                <div className={inputContainerClass}>
                  <label className={labelClass}>Looking For</label>
                  <textarea
                    rows={3}
                    value={tempData.jobTarget || ''}
                    onChange={e => setTempData({ ...tempData, jobTarget: e.target.value })}
                    className={inputClass}
                    placeholder="e.g., Full-time position in Solar Installation & Electrical Maintenance"
                  />
                </div>

                <div className="pt-4 flex flex-col sm:flex-row justify-end gap-2">
                  <button
                    onClick={() => setModalType(null)}
                    className={`${buttonBaseClass} ${isDarkMode ? "bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 active:scale-95" : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm active:scale-95"}`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className={`${buttonBaseClass} bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 active:scale-95`}
                  >
                    <Save size={16} /> Save All Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {profileData?.name || 'User'}!</h1>
            <p className="text-gray-400 mt-1 text-sm md:text-base">Here's what's happening with your job search today.</p>
          </div>
          <div className="bg-[#2d3748] px-4 py-2 rounded-lg border border-gray-700">
            <span className="text-gray-400 text-sm">Profile Views</span>
            <div className="text-2xl font-bold text-[#3182ce]">{profileViews}</div>
          </div>
        </header>

        {/* Top Section: Profile & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">

          {/* Left Card: Profile Summary */}
          <div className="bg-[#2d3748] rounded-xl p-4 md:p-6 shadow-lg border border-gray-700 relative">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-semibold text-white">My Profile</h2>
              <button
                onClick={openEditProfile}
                className="text-[#3182ce] text-sm hover:underline flex items-center gap-1"
              >
                <Edit2 size={14} /> Edit
              </button>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400 text-sm md:text-base">Name</span>
                <span className="font-medium text-sm md:text-base">{profileData?.name || 'Rajesh Kumar'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400 text-sm md:text-base">Username</span>
                <span className="font-medium text-sm md:text-base">{profileData?.username || 'rajesh.kumar'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400 text-sm md:text-base">Location</span>
                <span className="font-medium text-sm md:text-base">{profileData?.location || 'Mumbai, Maharashtra'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400 text-sm md:text-base">Phone</span>
                <span className="font-medium text-sm md:text-base">{profileData?.phone || '+91 98765 43210'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400 text-sm md:text-base">Email</span>
                <span className="font-medium text-sm md:text-base break-all">{profileData?.email || 'rajesh.kumar@email.com'}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-400 text-sm md:text-base">Password</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium tracking-widest text-sm md:text-base">********</span>
                  <button className="text-[#3182ce] text-xs hover:text-blue-400">Change</button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card: Personal Details & Documents */}
          <div className="bg-[#2d3748] rounded-xl p-4 md:p-6 shadow-lg border border-gray-700 relative">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-semibold text-white">Details & Credentials</h2>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Age</p>
                  <p className="font-medium text-base md:text-lg">{profileData?.age || '32'} years</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Aadhaar Number</p>
                  <p className="font-medium text-base md:text-lg">{profileData?.aadhaar || 'XXXX XXXX 4567'}</p>
                </div>
              </div>

              <div>
                <p className="text-gray-400 text-sm mb-1">Highest Education</p>
                <p className="font-medium text-base md:text-lg">{profileData?.education || 'ITI - Electrician Trade'}</p>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <p className="text-gray-400 text-sm mb-3">Documents</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-green-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="text-white text-sm md:text-base">Resume (PDF)</span>
                  </div>
                  <div className="flex items-center gap-3 text-green-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="text-white text-sm md:text-base">Certificates (3 submitted)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Skills & Preferences */}
        <div className="bg-[#2d3748] rounded-xl p-4 md:p-6 shadow-lg border border-gray-700 mb-6 md:mb-8 relative">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-semibold text-white">Skills & Job Target</h2>
          </div>

          <div className="mb-4 md:mb-6">
            <p className="text-gray-400 text-sm mb-3">Skills</p>
            <div className="flex flex-wrap gap-2 md:gap-3 overflow-x-auto">
              {skills.map((skill, idx) => (
                <span key={idx} className="bg-[#3182ce] text-white px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-medium shadow-sm whitespace-nowrap">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-2">Looking For</p>
            <p className="text-base md:text-lg font-medium">{profileData?.jobTarget || 'Full-time position in Solar Installation & Electrical Maintenance'}</p>
          </div>
        </div>

        {/* Bottom Section: Activity Tracking */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">

          {/* Card 1: Learning Path */}
          <div className="bg-[#2d3748] rounded-xl p-4 md:p-6 shadow-lg border border-gray-700">
            <div className="flex items-center gap-2 mb-4 text-[#3182ce]">
              <TrendingUp size={20} />
              <h3 className="font-semibold text-white text-base md:text-lg">Learning Path</h3>
            </div>
            <p className="text-gray-400 text-sm mb-2">Currently Pursuing:</p>
            <p className="font-medium mb-4 text-sm md:text-base">Advanced Solar Systems Certification</p>

            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Progress</span>
              <span className="text-[#3182ce] font-bold">{learningProgress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div className="bg-[#3182ce] h-2.5 rounded-full transition-all duration-300" style={{ width: `${learningProgress}%` }}></div>
            </div>
          </div>

          {/* Card 2: Application Responses */}
          <div className="bg-[#2d3748] rounded-xl p-4 md:p-6 shadow-lg border border-gray-700">
            <h3 className="font-semibold text-white mb-4 text-base md:text-lg">Application Responses</h3>
            <div className="space-y-4">
              {recentApplications.map((app, idx) => (
                <div key={idx} className="border-l-2 border-gray-600 pl-3">
                  <p className="font-medium text-xs md:text-sm">{app.title}</p>
                  <p className={`text-xs ${app.statusColor} font-medium`}>{app.status}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Recommended Opportunities */}
          <div className="bg-[#2d3748] rounded-xl p-4 md:p-6 shadow-lg border border-gray-700 md:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-white mb-4 text-base md:text-lg">Recommended Opportunities</h3>
            <div className="space-y-4">
              {recommendedJobs.map((job, idx) => (
                <div key={idx} className="pb-3 border-b border-gray-700 last:border-0 last:pb-0">
                  <p className="font-medium text-xs md:text-sm">{job.title}</p>
                  <p className="text-gray-400 text-xs mb-1">{job.company}</p>
                  <button className="text-[#3182ce] text-xs font-medium hover:underline flex items-center gap-1">
                    Apply Quick <span>→</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Action Space */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
          <button
            onClick={openEditProfile}
            className="bg-[#3182ce] hover:bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-colors shadow-md flex items-center justify-center gap-2 active:scale-95"
          >
            <Edit2 size={18} /> Update Profile
          </button>
          <button className="bg-transparent border border-[#3182ce] text-[#3182ce] hover:bg-[#3182ce] hover:text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 active:scale-95">
            <Briefcase size={18} /> Browse All Jobs
          </button>
        </div>

      </div>
    </div>
  );
};

export default JobSeekerDashboard;
