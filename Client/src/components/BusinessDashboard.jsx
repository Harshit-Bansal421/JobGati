import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Settings, FileText, Users, Edit2, Plus, 
  X, Save, PenTool, EyeOff, MapPin, Clock, DollarSign, CheckSquare, Phone,
  Trash2, Power, AlertCircle
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
    getBusinessProfile, updateBusiness, 
    getBusinessJobs, postJob, updateJob, deleteJob, toggleJobStatus 
} from '../services/BusinessServices';
import { setUserData } from '../store/slices/userSlice';

// --- MAIN COMPONENT ---
export default function CompanyDashboard({ isDarkMode = true }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: currentUser } = useSelector((state) => state.user);
  
  const [data, setData] = useState({
      businessName: "",
      username: "",
      email: "", 
      industry: "",
      location: "",
      contact: "",
      about: "",
      jobs: []
  });
  
  const [modalType, setModalType] = useState(null);
  const [tempData, setTempData] = useState({});
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load Initial Data
  useEffect(() => {
      const fetchData = async () => {
          if (!currentUser?._id) {
              setLoading(false);
              return; // Should probably redirect to login
          }

          try {
              setLoading(true);
              // Fetch latest profile and jobs in parallel
              const [profile, jobs] = await Promise.all([
                  getBusinessProfile(currentUser._id),
                  getBusinessJobs(currentUser._id)
              ]);

              if (profile) {
                 dispatch(setUserData(profile)); // Keep redux in sync
                 setData(prev => ({ ...profile, jobs: jobs || [] }));
              }
          } catch (error) {
              console.error("Error fetching dashboard data:", error);
          } finally {
              setLoading(false);
          }
      };

      fetchData();
  }, [currentUser?._id, dispatch]);

  // Unified Edit Handler
  const openEditProfile = () => {
    setTempData({ ...data }); 
    setModalType('editProfile');
  };

  const handleSaveProfile = async () => {
    if (!currentUser?._id) return;
    setSaving(true);
    
    try {
        // Remove jobs from profile update payload if present
        const { jobs, ...profileData } = tempData;
        
        const updatedProfile = await updateBusiness(currentUser._id, profileData);
        if (updatedProfile) {
            setData(prev => ({ ...prev, ...updatedProfile }));
            dispatch(setUserData(updatedProfile));
            setModalType(null);
        }
    } catch (error) {
        console.error("Error saving profile:", error);
        alert("Failed to save profile changes.");
    } finally {
        setSaving(false);
    }
  };

  const handleSaveJob = async () => {
    if (!currentUser?._id) return;
    setSaving(true);

    try {
        if (selectedJob) {
          // UPDATE EXISTING JOB
          const updatedJob = await updateJob(selectedJob._id, { ...tempData, title: tempData.newJobTitle });
          
          if (updatedJob) {
              const updatedJobs = data.jobs.map(job => 
                job._id === selectedJob._id ? updatedJob : job
              );
              setData({ ...data, jobs: updatedJobs });
          }
        } else {
          // CREATE NEW JOB
          const newJobData = {
            ...tempData,
            title: tempData.newJobTitle,
            businessId: currentUser._id, // Attach business ID
            jobCategory: tempData.jobCategory || "Other",
            jobType: tempData.jobType || "Full-time",
            status: "Active"
          };
    
          const createdJob = await postJob(newJobData);
          if (createdJob) {
              setData({ ...data, jobs: [createdJob, ...data.jobs] });
          }
        }
        setModalType(null);
        setSelectedJob(null);
        setTempData({});
    } catch (error) {
        console.error("Error saving job:", error);
        alert("Failed to save job details.");
    } finally {
        setSaving(false);
    }
  };

  const handleDeleteJob = async (id) => {
    if(window.confirm("Are you sure you want to delete this job post?")) {
      const res = await deleteJob(id);
      if (res && res.success) {
          const updatedJobs = data.jobs.filter(job => job._id !== id);
          setData({ ...data, jobs: updatedJobs });
          setModalType(null);
      }
    }
  };

  const handleToggleStatus = async (id) => {
    const updatedJob = await toggleJobStatus(id);
    if (updatedJob) {
        const updatedJobs = data.jobs.map(job => {
          if (job._id === id) {
            return updatedJob;
          }
          return job;
        });
        setData({ ...data, jobs: updatedJobs });
        
        // Also update selectedJob if it's the one currently open in modal
        if (selectedJob && selectedJob._id === id) {
            setSelectedJob(updatedJob);
        }
    }
  };

  const handleViewApplicants = (job) => {
    setSelectedJob(job);
    setModalType('applicants');
  };

  const openManageJobModal = (job) => {
    setSelectedJob(job);
    setModalType('manageJob');
  };

  const openEditJobModal = () => {
    setTempData({
      newJobTitle: selectedJob.title,
      jobCategory: selectedJob.jobCategory,
      jobType: selectedJob.jobType,
      vacancies: selectedJob.vacancies,
      skills: selectedJob.skills,
      experience: selectedJob.experience,
      education: selectedJob.education,
      salary: selectedJob.salary,
      payFreq: selectedJob.payFreq,
      overtime: selectedJob.overtime,
      accommodation: selectedJob.accommodation,
      food: selectedJob.food,
      location: selectedJob.location,
      shift: selectedJob.shift,
      description: selectedJob.description
    });
    setModalType('newJob');
  };

  // Helper styles strings to keep JSX cleaner
  const inputContainerClass = "mb-4";
  const labelClass = `block text-xs uppercase font-bold mb-1 tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`;
  const inputClass = `w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-600' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'}`;
  const modalOverlayClass = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn";
  const modalContainerClass = `rounded-2xl w-full max-w-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`;
  const modalHeaderClass = `flex justify-between items-center p-4 border-b ${isDarkMode ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-slate-50'}`;
  const buttonBaseClass = "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 w-full";

  if (loading) {
      return (
          <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50'}`}>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
      );
  }

  // If no user data even after loading (e.g. strict protected route logic needed elsewhere)
  if (!currentUser) {
      return (
        <div className={`min-h-screen flex flex-col items-center justify-center ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50'}`}>
            <p>Please log in to view the dashboard.</p>
            <button onClick={() => navigate('/login')} className="mt-4 text-blue-500 underline">Go to Login</button>
        </div>
      )
  }

  return (
    <div className={`min-h-screen p-4 md:p-8 font-sans transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* --- MODAL: EDIT COMPLETE PROFILE (UNIFIED) --- */}
        {modalType === 'editProfile' && (
          <div className={modalOverlayClass}>
            <div className={modalContainerClass}>
              <div className={modalHeaderClass}>
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Edit Company Profile</h3>
                <button onClick={() => setModalType(null)} className={`p-1 rounded-full ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'}`}><X size={20} /></button>
              </div>
              <div className="p-6 overflow-y-auto custom-scrollbar">
                
                {/* Organization Details Section */}
                <h4 className="text-blue-500 text-sm font-bold uppercase tracking-wider mb-4 border-b border-opacity-20 border-slate-500 pb-2 flex items-center gap-2">Organization Details</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={inputContainerClass}>
                    <label className={labelClass}>Business Name</label>
                    <input type="text" value={tempData.businessName || ''} onChange={e => setTempData({...tempData, businessName: e.target.value})} className={inputClass} />
                  </div>
                  <div className={inputContainerClass}>
                    <label className={labelClass}>Username</label>
                    <input type="text" value={tempData.username || ''} onChange={e => setTempData({...tempData, username: e.target.value})} className={inputClass} />
                  </div>
                  <div className={inputContainerClass}>
                    <label className={labelClass}>Contact</label>
                    <input type="text" value={tempData.contact || ''} onChange={e => setTempData({...tempData, contact: e.target.value})} className={inputClass} />
                  </div>
                  <div className={inputContainerClass}>
                    <label className={labelClass}>Email</label>
                    <input type="text" value={tempData.email || ''} onChange={e => setTempData({...tempData, email: e.target.value})} className={inputClass} />
                  </div>
                  <div className={inputContainerClass}>
                    <label className={labelClass}>Location</label>
                    <input type="text" value={tempData.location || ''} onChange={e => setTempData({...tempData, location: e.target.value})} className={inputClass} />
                  </div>
                  <div className={inputContainerClass}>
                    <label className={labelClass}>Industry</label>
                    <input type="text" value={tempData.industry || ''} onChange={e => setTempData({...tempData, industry: e.target.value})} className={inputClass} />
                  </div>
                </div>

                {/* About Business Section */}
                <h4 className="text-blue-500 text-sm font-bold uppercase tracking-wider mb-4 mt-6 border-b border-opacity-20 border-slate-500 pb-2 flex items-center gap-2">About Business</h4>
                <div className={inputContainerClass}>
                  <label className={labelClass}>Description</label>
                  <textarea rows={4} value={tempData.about || ''} onChange={e => setTempData({...tempData, about: e.target.value})} className={inputClass} />
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <button onClick={() => setModalType(null)} className={`${buttonBaseClass} ${isDarkMode ? "bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 active:scale-95" : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm active:scale-95"}`} disabled={saving}>Cancel</button>
                  <button onClick={handleSaveProfile} className={`${buttonBaseClass} bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 active:scale-95`} disabled={saving}>
                      {saving ? "Saving..." : <><Save size={16}/> Save Changes</>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- MODAL: APPLICANTS LIST --- */}
        {modalType === 'applicants' && (
          <div className={modalOverlayClass}>
            <div className={modalContainerClass}>
              <div className={modalHeaderClass}>
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Applicants for {selectedJob?.title}</h3>
                <button onClick={() => setModalType(null)} className={`p-1 rounded-full ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'}`}><X size={20} /></button>
              </div>
              <div className="p-6 overflow-y-auto custom-scrollbar">
                <div className="space-y-3">
                   {/* NOTE: Applicants logic needs to be connected to backend when applicants data model is ready. 
                       For now, showing 0 or mock if necessary, but focusing on job/business integration first. 
                       Currently `job.applicants` is a number from the model. 
                   */}
                   {selectedJob?.applicants === 0 && <p className="text-center text-gray-500">No applicants yet.</p>}
                   
                   {/* Placeholder for when we have applicant objects */}
                   {[...Array(selectedJob?.applicants || 0)].map((_, index) => {
                       const id = index + 1;
                       return (
                           <div key={id} className={`p-4 rounded-lg flex justify-between items-center border transition-colors ${isDarkMode ? 'bg-slate-700/50 border-slate-600 hover:bg-slate-700' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}>
                              <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-900/50">A{id}</div>
                                  <div>
                                      <p className={`font-bold text-sm md:text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Applicant {id}</p>
                                      <div className="flex gap-2 text-xs text-slate-400 mt-0.5">
                                         <span>Details unavailable</span>
                                      </div>
                                  </div>
                              </div>
                           </div>
                       )
                   })}
               </div>
               <div className="pt-4 flex justify-end">
                  <button onClick={() => setModalType(null)} className={`${buttonBaseClass} ${isDarkMode ? "bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 active:scale-95" : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm active:scale-95"}`}>Close</button>
               </div>
              </div>
            </div>
          </div>
        )}

        {/* --- MODAL: MANAGE JOB --- */}
        {modalType === 'manageJob' && (
          <div className={modalOverlayClass}>
            <div className={modalContainerClass}>
              <div className={modalHeaderClass}>
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Manage Job</h3>
                <button onClick={() => setModalType(null)} className={`p-1 rounded-full ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'}`}><X size={20} /></button>
              </div>
              <div className="p-6 overflow-y-auto custom-scrollbar">
                 <div className="space-y-4">
                    <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-slate-700/30 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                       <h4 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{selectedJob?.title}</h4>
                       <div className="flex gap-4 text-sm text-slate-400 mt-1">
                          <span>{selectedJob?.status}</span>
                          <span>•</span>
                          <span>Posted on {selectedJob?.date}</span>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                       <button onClick={openEditJobModal} className={`${buttonBaseClass} ${isDarkMode ? "bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 active:scale-95" : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm active:scale-95"}`}>
                          <Edit2 size={16} /> Edit Job Details
                       </button>
                       
                       <button onClick={() => handleToggleStatus(selectedJob?._id)} className={`${buttonBaseClass} ${selectedJob?.status === 'Active' ? (isDarkMode ? "bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 active:scale-95" : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm active:scale-95") : "bg-green-900/20 hover:bg-green-900/40 text-green-400 border border-green-900/50 active:scale-95"}`}>
                          <Power size={16} /> {selectedJob?.status === 'Active' ? 'Close Job Position' : 'Re-open Job Position'}
                       </button>
                       
                       <div className={`h-px my-2 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
                       
                       <button onClick={() => handleDeleteJob(selectedJob?._id)} className={`${buttonBaseClass} bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-900/50 active:scale-95`}>
                          <Trash2 size={16} /> Delete Job Permanently
                       </button>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* --- MODAL: POST / EDIT JOB --- */}
        {modalType === 'newJob' && (
          <div className={modalOverlayClass}>
            <div className={modalContainerClass}>
              <div className={modalHeaderClass}>
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{selectedJob ? "Edit Job" : "Post New Job"}</h3>
                <button onClick={() => setModalType(null)} className={`p-1 rounded-full ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'}`}><X size={20} /></button>
              </div>
              <div className="p-6 overflow-y-auto custom-scrollbar">
                
                {/* SECTION 1 */}
                <h4 className="text-blue-500 text-sm font-bold uppercase tracking-wider mb-4 mt-6 border-b border-opacity-20 border-slate-500 pb-2 flex items-center gap-2">1. Job Overview</h4>
                <div className={inputContainerClass}>
                  <label className={labelClass}>Job Title</label>
                  <input type="text" value={tempData.newJobTitle || ''} onChange={e => setTempData({...tempData, newJobTitle: e.target.value})} placeholder="e.g. Senior Welder" className={inputClass} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className={inputContainerClass}>
                      <label className={labelClass}>Job Category</label>
                      <select value={tempData.jobCategory || ''} onChange={e => setTempData({...tempData, jobCategory: e.target.value})} className={`${inputClass} appearance-none`}>
                        <option value="" disabled>Select Job Category</option>
                        {["Construction", "Electrical", "Plumbing", "Manufacturing", "Logistics", "Other"].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                   </div>
                   <div className={inputContainerClass}>
                      <label className={labelClass}>Job Type</label>
                      <select value={tempData.jobType || ''} onChange={e => setTempData({...tempData, jobType: e.target.value})} className={`${inputClass} appearance-none`}>
                        <option value="" disabled>Select Job Type</option>
                        {["Full-time", "Contractual", "Daily Wage", "Part-time"].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                   </div>
                </div>
                <div className={inputContainerClass}>
                  <label className={labelClass}>Total Vacancies</label>
                  <input type="number" value={tempData.vacancies || ''} onChange={e => setTempData({...tempData, vacancies: e.target.value})} className={inputClass} />
                </div>

                {/* SECTION 2 */}
                <h4 className="text-blue-500 text-sm font-bold uppercase tracking-wider mb-4 mt-6 border-b border-opacity-20 border-slate-500 pb-2 flex items-center gap-2">2. Candidate Requirements</h4>
                <div className={inputContainerClass}>
                  <label className={labelClass}>Required Skills (Comma separated)</label>
                  <input type="text" value={tempData.skills || ''} onChange={e => setTempData({...tempData, skills: e.target.value})} placeholder="e.g. Welding, Safety, Metal Cutting" className={inputClass} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className={inputContainerClass}>
                      <label className={labelClass}>Experience Required</label>
                      <select value={tempData.experience || ''} onChange={e => setTempData({...tempData, experience: e.target.value})} className={`${inputClass} appearance-none`}>
                        <option value="" disabled>Select Experience Required</option>
                        {["Fresher", "0-1 Year", "1-3 Years", "3-5 Years", "5+ Years"].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                   </div>
                   <div className={inputContainerClass}>
                      <label className={labelClass}>Minimum Education</label>
                      <select value={tempData.education || ''} onChange={e => setTempData({...tempData, education: e.target.value})} className={`${inputClass} appearance-none`}>
                        <option value="" disabled>Select Minimum Education</option>
                        {["Below 10th", "10th Pass", "12th Pass", "ITI", "Diploma", "Graduate"].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                   </div>
                </div>

                {/* SECTION 3 */}
                <h4 className="text-blue-500 text-sm font-bold uppercase tracking-wider mb-4 mt-6 border-b border-opacity-20 border-slate-500 pb-2 flex items-center gap-2">3. Salary & Perks</h4>
                <div className={inputContainerClass}>
                  <label className={labelClass}>Fixed Salary</label>
                  <input type="number" value={tempData.salary || ''} onChange={e => setTempData({...tempData, salary: e.target.value})} placeholder="₹" className={inputClass} />
                </div>
                <div className={inputContainerClass}>
                  <label className={labelClass}>Payment Frequency</label>
                  <select value={tempData.payFreq || ''} onChange={e => setTempData({...tempData, payFreq: e.target.value})} className={`${inputClass} appearance-none`}>
                    <option value="" disabled>Select Payment Frequency</option>
                    {["Monthly", "Weekly", "Daily", "Per Task"].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div className={`mb-4 flex items-center gap-3 p-3 rounded-lg border ${isDarkMode ? 'bg-slate-900/50 border-slate-700/50' : 'bg-slate-50 border-slate-200'}`}>
                  <input type="checkbox" checked={tempData.overtime || false} onChange={e => setTempData({...tempData, overtime: e.target.checked})} className="accent-blue-500 w-5 h-5 rounded" />
                  <label className={`text-sm font-medium cursor-pointer ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`} onClick={() => setTempData({...tempData, overtime: !tempData.overtime})}>Paid Overtime Available?</label>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="mb-4">
                    <label className={`${labelClass} mb-2`}>Accommodation</label>
                    <div className="flex gap-4">
                      {["Provided", "Not Provided"].map(opt => (
                        <label key={opt} className={`flex items-center gap-2 cursor-pointer ${isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-blue-600'}`}>
                          <input type="radio" name="accom" value={opt} checked={tempData.accommodation === opt} onChange={() => setTempData({...tempData, accommodation: opt})} className="accent-blue-500 w-4 h-4" />
                          <span className="text-sm">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className={`${labelClass} mb-2`}>Food / Canteen</label>
                    <div className="flex gap-4">
                      {["Provided", "Subsidized", "Not Provided"].map(opt => (
                        <label key={opt} className={`flex items-center gap-2 cursor-pointer ${isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-blue-600'}`}>
                          <input type="radio" name="food" value={opt} checked={tempData.food === opt} onChange={() => setTempData({...tempData, food: opt})} className="accent-blue-500 w-4 h-4" />
                          <span className="text-sm">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* SECTION 4 */}
                <h4 className="text-blue-500 text-sm font-bold uppercase tracking-wider mb-4 mt-6 border-b border-opacity-20 border-slate-500 pb-2 flex items-center gap-2">4. Location & Schedule</h4>
                <div className={inputContainerClass}>
                  <label className={labelClass}>Work Location / Site Address</label>
                  <textarea rows={3} value={tempData.location || ''} onChange={e => setTempData({...tempData, location: e.target.value})} className={inputClass} />
                </div>
                <div className={inputContainerClass}>
                  <label className={labelClass}>Shift Timings</label>
                  <input type="text" value={tempData.shift || ''} onChange={e => setTempData({...tempData, shift: e.target.value})} placeholder="e.g. 9:00 AM - 6:00 PM" className={inputClass} />
                </div>

                <div className={`pt-6 flex justify-end gap-3 border-t mt-6 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                  <button onClick={() => setModalType(null)} className={`${buttonBaseClass} ${isDarkMode ? "bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 active:scale-95" : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm active:scale-95"}`} disabled={saving}>Cancel</button>
                  <button onClick={handleSaveJob} className={`${buttonBaseClass} bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 active:scale-95`} disabled={saving}>
                       {saving ? "Saving..." : <><Plus size={16}/> {selectedJob ? "Save Changes" : "Post Job"}</>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- HEADER --- */}
        <div className={`flex justify-between items-center border-b pb-6 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
          <div>
            <h1 className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Company Dashboard</h1>
            <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{data.businessName}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className={`px-3 py-1 rounded-full text-xs font-bold border ${isDarkMode ? 'bg-blue-900/30 text-blue-300 border-blue-500/30' : 'bg-blue-50 text-blue-600 border-blue-200'}`}>
              Verified Recruiter
            </div>
          </div>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Card 1: Organization Details */}
          <div className={`rounded-xl border shadow-sm p-6 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <div className={`flex items-center justify-between mb-4 border-b pb-2 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
              <div className="flex items-center gap-2">
                <Settings size={18} className="text-blue-500" />
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>Organization Details</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
               <div className="space-y-1">
                 <div className="mb-4">
                    <p className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Business Name</p>
                    <div className="flex items-center gap-2"><p className={`text-sm md:text-base font-medium ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>{data.businessName}</p></div>
                 </div>
                 <div className="mb-4">
                    <p className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Username</p>
                    <div className="flex items-center gap-2"><p className={`text-sm md:text-base font-medium ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>{data.username}</p></div>
                 </div>
                 <div className="mb-4">
                    <p className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Industry</p>
                    <div className="flex items-center gap-2"><p className={`text-sm md:text-base font-medium ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>{data.industry}</p></div>
                 </div>
                 <div className="mb-4">
                    <p className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Location</p>
                    <div className="flex items-center gap-2"><p className={`text-sm md:text-base font-medium ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>{data.location}</p></div>
                 </div>
               </div>
               <div className="space-y-1">
                 <div className="mb-4">
                    <p className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Contact</p>
                    <div className="flex items-center gap-2"><p className={`text-sm md:text-base font-medium ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>{data.contact}</p></div>
                 </div>
                 <div className="mb-4">
                    <p className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Email</p>
                    <div className="flex items-center gap-2"><p className={`text-sm md:text-base font-medium ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>{data.email}</p></div>
                 </div>
                 <div className="mb-4">
                    <p className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Password</p>
                    <div className="flex items-center gap-2">
                      <p className={`text-sm md:text-base font-medium ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>••••••••</p>
                      <Edit2 size={12} className="text-blue-500 cursor-pointer" />
                    </div>
                 </div>
               </div>
            </div>
          </div>

          {/* Card 2: About Business */}
          <div className={`rounded-xl border shadow-sm p-6 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <div className={`flex items-center justify-between mb-4 border-b pb-2 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-blue-500" />
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>About Business</h3>
              </div>
            </div>
            <p className={`leading-relaxed text-sm md:text-base ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{data.about || "No description provided."}</p>
            <div className={`mt-6 pt-6 border-t flex gap-6 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
              <div className="text-center">
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{data.jobs.filter(j => j.status === 'Active').length}</p>
                <p className={`text-xs uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Active Jobs</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-500">0</p>
                <p className={`text-xs uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Total Hired</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- JOB LIST --- */}
        <div className={`rounded-xl border shadow-sm p-6 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="flex justify-between items-center mb-6">
            <div className={`flex items-center justify-between mb-4 border-b pb-2 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
              <div className="flex items-center gap-2">
                <Briefcase size={18} className="text-blue-500" />
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>Posted Jobs & Responses</h3>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`border-b text-xs uppercase tracking-wider ${isDarkMode ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                  <th className="p-4 font-medium">Job Title</th>
                  <th className="p-4 font-medium">Date Posted</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Responses</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {data.jobs.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="p-4 text-center text-slate-500">No jobs posted yet.</td>
                    </tr>
                ) : (
                    data.jobs.map(job => (
                    <tr key={job._id} className={`border-b transition-colors ${isDarkMode ? 'border-slate-700/50 hover:bg-slate-700/30' : 'border-slate-200 hover:bg-slate-50'}`}>
                        <td className={`p-4 font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{job.title}</td>
                        <td className={`p-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{job.date}</td>
                        <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${job.status === 'Active' ? (isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700') : (isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-slate-200 text-slate-600')}`}>
                            {job.status}
                        </span>
                        </td>
                        <td className="p-4">
                        <button 
                            onClick={() => handleViewApplicants(job)}
                            className="text-blue-500 hover:text-blue-600 font-medium hover:underline flex items-center gap-1 transition-colors"
                        >
                            <Users size={14} /> 
                            <span>{job.applicants}</span>
                            <span className="hidden sm:inline">Applicants</span>
                        </button>
                        </td>
                        <td className="p-4 text-right">
                        <button 
                            onClick={() => openManageJobModal(job)}
                            className={`${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-700'}`}
                        >
                            Manage
                        </button>
                        </td>
                    </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- FOOTER ACTIONS --- */}
        <div className={`flex flex-col sm:flex-row gap-4 pt-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
           <button onClick={openEditProfile} className={`${buttonBaseClass} ${isDarkMode ? "bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 active:scale-95" : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm active:scale-95"}`}>
              <Edit2 size={16} /> Edit Profile
           </button>
           <button onClick={() => { setTempData({}); setSelectedJob(null); setModalType('newJob'); }} className={`${buttonBaseClass} bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 active:scale-95`}>
              <Plus size={16}/> Post New Job
           </button>
        </div>

      </div>
    </div>
  );
}