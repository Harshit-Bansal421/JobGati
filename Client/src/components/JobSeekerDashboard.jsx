import React, { useState } from 'react';
import { 
  User, Briefcase, FileText, Award, Zap, CheckCircle, 
  PenTool, Eye, EyeOff, Save, X, File
} from 'lucide-react';

// --- DATA ---
const SEEKER_DATA = {
  name: "Rahul Sharma",
  username: "rahul_welder_99",
  location: "Pune, Maharashtra",
  phone: "+91 98765 43210",
  email: "rahul.sharma@example.com",
  age: 26,
  adhaar: "XXXX-XXXX-1234",
  education: "ITI Certification (Welding)",
  skills: ["Arc Welding", "Metal Fabrication", "Safety Compliance", "Blueprint Reading"],
  targetRole: "Senior Welder / Industrial Fitter",
  course: "Advanced TIG Welding Certification",
  courseProgress: 75,
  applications: [
    { id: 1, title: "Welder at ABC Corp", status: "Viewed", color: "text-blue-400" },
    { id: 2, title: "Fitter at XYZ Ltd", status: "Interview", color: "text-green-400" },
  ],
  recommendations: [
    { id: 101, title: "Industrial Pipe Fitter", company: "Tata Motors", location: "Pune", applied: false },
    { id: 102, title: "Structural Welder", company: "L&T Heavy Eng", location: "Mumbai", applied: false }
  ],
  documents: {
    resume: "Rahul_Sharma_Resume_2024.pdf",
    certificates: [
      "ITI Welder Certificate",
      "Safety Compliance Level 1",
      "Blueprint Reading Basics"
    ],
    pendingCertificates: []
  }
};

// --- MAIN COMPONENT ---
export default function JobSeekerDashboard() {
  const [data, setData] = useState(SEEKER_DATA);
  const [modalType, setModalType] = useState(null);
  const [tempData, setTempData] = useState({});
  const [selectedDocType, setSelectedDocType] = useState(null); 

  const handleEdit = (section, currentData) => {
    setTempData({ ...currentData });
    setModalType(section);
  };

  const handleSave = () => {
    setData({ ...data, ...tempData });
    setModalType(null);
  };

  const applyToJob = (id) => {
    const updatedRecs = data.recommendations.map(job => 
      job.id === id ? { ...job, applied: true } : job
    );
    setData({ ...data, recommendations: updatedRecs });
  };

  const handleViewDocument = (type) => {
    setSelectedDocType(type);
    setModalType('viewDoc');
  };

  // Styles
  const cardClass = "bg-slate-800 rounded-xl border border-slate-700 shadow-sm p-6";
  const modalOverlayClass = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn";
  const modalContentClass = "bg-slate-800 rounded-2xl w-full max-w-lg border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]";
  const inputLabelClass = "block text-xs uppercase text-slate-400 font-bold mb-1 tracking-wider";
  const inputClass = "w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500";
  const buttonBase = "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2";
  const btnPrimary = `${buttonBase} bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 active:scale-95`;
  const btnSecondary = `${buttonBase} bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 active:scale-95`;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* --- MODAL: EDIT PROFILE --- */}
        {modalType === 'profile' && (
          <div className={modalOverlayClass}>
            <div className={modalContentClass}>
              <div className="flex justify-between items-center p-4 border-b border-slate-700 bg-slate-900/50">
                <h3 className="text-xl font-bold text-white">Edit Profile</h3>
                <button onClick={() => setModalType(null)} className="text-slate-400 hover:text-white p-1 hover:bg-slate-700 rounded-full"><X size={20} /></button>
              </div>
              <div className="p-6 overflow-y-auto custom-scrollbar">
                <div className="mb-4">
                  <label className={inputLabelClass}>Full Name</label>
                  <input type="text" value={tempData.name || ''} onChange={(e) => setTempData({...tempData, name: e.target.value})} className={inputClass} />
                </div>
                <div className="mb-4">
                  <label className={inputLabelClass}>Location</label>
                  <input type="text" value={tempData.location || ''} onChange={(e) => setTempData({...tempData, location: e.target.value})} className={inputClass} />
                </div>
                <div className="mb-4">
                  <label className={inputLabelClass}>Phone</label>
                  <input type="text" value={tempData.phone || ''} onChange={(e) => setTempData({...tempData, phone: e.target.value})} className={inputClass} />
                </div>
                <div className="mb-4">
                  <label className={inputLabelClass}>Email</label>
                  <input type="text" value={tempData.email || ''} onChange={(e) => setTempData({...tempData, email: e.target.value})} className={inputClass} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className={inputLabelClass}>Age</label>
                    <input type="text" value={tempData.age || ''} onChange={(e) => setTempData({...tempData, age: e.target.value})} className={inputClass} />
                  </div>
                  <div className="mb-4">
                    <label className={inputLabelClass}>Highest Education</label>
                    <input type="text" value={tempData.education || ''} onChange={(e) => setTempData({...tempData, education: e.target.value})} className={inputClass} />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <button onClick={() => setModalType(null)} className={btnSecondary}>Cancel</button>
                  <button onClick={handleSave} className={btnPrimary}><Save size={16}/> Save Changes</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- MODAL: DOCUMENT PREVIEW --- */}
        {modalType === 'viewDoc' && (
          <div className={modalOverlayClass}>
            <div className={modalContentClass}>
              <div className="flex justify-between items-center p-4 border-b border-slate-700 bg-slate-900/50">
                <h3 className="text-xl font-bold text-white">{selectedDocType === 'resume' ? 'My Resume' : 'My Certificates'}</h3>
                <button onClick={() => setModalType(null)} className="text-slate-400 hover:text-white p-1 hover:bg-slate-700 rounded-full"><X size={20} /></button>
              </div>
              <div className="p-6 overflow-y-auto custom-scrollbar">
                 <div className="space-y-4">
                    {selectedDocType === 'resume' && (
                      <div className="bg-slate-700/50 p-4 rounded border border-slate-600 flex flex-col items-center justify-center min-h-[200px]">
                         <FileText size={48} className="text-slate-400 mb-2" />
                         <p className="text-lg font-medium text-white">{data.documents.resume}</p>
                         <p className="text-sm text-slate-400 mb-4">PDF • 1.2 MB</p>
                         <button className={btnPrimary}>Download Resume</button>
                      </div>
                    )}

                    {selectedDocType === 'certificates' && (
                      <div className="space-y-3">
                         {data.documents.certificates.map((cert, index) => (
                           <div key={index} className="flex items-center gap-3 p-3 bg-slate-700/30 border border-slate-600 rounded-lg">
                              <div className="w-10 h-10 bg-blue-900/30 rounded flex items-center justify-center text-blue-400">
                                 <Award size={20} />
                              </div>
                              <div className="flex-1">
                                 <p className="text-white font-medium">{cert}</p>
                                 <p className="text-xs text-green-400 flex items-center gap-1"><CheckCircle size={10} /> Verified</p>
                              </div>
                              <button className="text-slate-400 hover:text-white"><Eye size={16}/></button>
                           </div>
                         ))}
                      </div>
                    )}
                 </div>
                 <div className="pt-4 flex justify-end">
                    <button onClick={() => setModalType(null)} className={btnSecondary}>Close</button>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {data.name.split(' ')[0]}</h1>
            <p className="text-slate-400">Track your applications and learning progress.</p>
          </div>
          <button onClick={() => handleEdit('profile', data)} className={btnPrimary}><PenTool size={16}/> Edit Profile</button>
        </div>

        {/* --- TOP SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={cardClass}>
            <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
              <div className="flex items-center gap-2">
                <User size={18} className="text-blue-500" />
                <h3 className="text-lg font-semibold text-slate-100">My Profile</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4">
                <p className="text-xs text-slate-400 font-medium mb-1">Full Name</p>
                <p className="text-slate-100 text-sm md:text-base font-medium">{data.name}</p>
              </div>
              <div className="mb-4">
                <p className="text-xs text-slate-400 font-medium mb-1">Username</p>
                <p className="text-slate-100 text-sm md:text-base font-medium">{data.username}</p>
              </div>
              <div className="mb-4">
                <p className="text-xs text-slate-400 font-medium mb-1">Location</p>
                <p className="text-slate-100 text-sm md:text-base font-medium">{data.location}</p>
              </div>
              <div className="mb-4">
                <p className="text-xs text-slate-400 font-medium mb-1">Phone</p>
                <p className="text-slate-100 text-sm md:text-base font-medium">{data.phone}</p>
              </div>
              <div className="mb-4">
                <p className="text-xs text-slate-400 font-medium mb-1">Email</p>
                <p className="text-slate-100 text-sm md:text-base font-medium">{data.email}</p>
              </div>
              <div className="mb-4">
                 <p className="text-xs text-slate-400 font-medium mb-1">Password</p>
                 <div className="flex items-center gap-2">
                   <span className="text-slate-100 text-lg tracking-widest">••••••••</span>
                 </div>
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-blue-500" />
                <h3 className="text-lg font-semibold text-slate-100">Details & Credentials</h3>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
               <div className="mb-4">
                 <p className="text-xs text-slate-400 font-medium mb-1">Age</p>
                 <p className="text-slate-100 text-sm md:text-base font-medium">{data.age} Years</p>
               </div>
               <div className="mb-4">
                 <p className="text-xs text-slate-400 font-medium mb-1">Highest Education</p>
                 <p className="text-slate-100 text-sm md:text-base font-medium">{data.education}</p>
               </div>
               <div className="col-span-2 mb-4">
                  <p className="text-xs text-slate-400 font-medium mb-1">Adhaar Number</p>
                  <p className="text-slate-100 text-sm md:text-base font-medium">•••• •••• {data.adhaar.slice(-4)}</p>
               </div>
            </div>
            
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-400 uppercase mb-3">Uploaded Documents</p>
              
              <div className="flex flex-wrap gap-4 mb-4">
                <button 
                  onClick={() => handleViewDocument('resume')}
                  className="flex items-center gap-2 text-green-400 text-sm bg-green-900/20 px-3 py-2 rounded border border-green-900/30 hover:bg-green-900/30 transition-colors"
                >
                  <FileText size={16} /> Resume.pdf
                </button>
                
                <button 
                  onClick={() => handleViewDocument('certificates')}
                  className="flex items-center gap-2 text-blue-400 text-sm bg-blue-900/20 px-3 py-2 rounded border border-blue-900/30 hover:bg-blue-900/30 transition-colors"
                >
                  <Award size={16} /> {data.documents.certificates.length} Certificates
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- SKILLS --- */}
        <div className={cardClass}>
          <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
            <div className="flex items-center gap-2">
              <Briefcase size={18} className="text-blue-500" />
              <h3 className="text-lg font-semibold text-slate-100">Skills & Job Target</h3>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
            <div>
              <p className="text-slate-400 text-sm mb-2">My Top Skills</p>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs font-medium border border-opacity-20 bg-blue-900 text-blue-200">{skill}</span>
                ))}
              </div>
            </div>
            <div className="bg-slate-700/30 px-6 py-4 rounded-lg border-l-4 border-blue-500 w-full md:w-auto">
              <p className="text-slate-400 text-xs uppercase">Looking For</p>
              <p className="text-white font-medium text-lg">{data.targetRole}</p>
            </div>
          </div>
        </div>

        {/* --- BOTTOM GRID --- */}
        <div className="grid grid-cols-1 gap-6">
          <div className={cardClass}>
            <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
              <div className="flex items-center gap-2">
                <Award size={18} className="text-blue-500" />
                <h3 className="text-lg font-semibold text-slate-100">Learning Path</h3>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-slate-300 text-sm font-medium mb-1">{data.course}</p>
              <p className="text-slate-500 text-xs mb-3">Skill India Certification</p>
              <div className="w-full bg-slate-700 rounded-full h-2.5 mb-2">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${data.courseProgress}%` }}></div>
              </div>
              <p className="text-right text-xs text-blue-400">{data.courseProgress}% Completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}