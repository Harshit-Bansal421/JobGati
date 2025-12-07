import React, { useState } from 'react';
import { 
  Briefcase, Settings, FileText, Users, Edit2, Plus, 
  X, Save, PenTool, EyeOff, MapPin, Clock, DollarSign, CheckSquare, Phone
} from 'lucide-react';

// --- DATA ---
const COMPANY_DATA = {
  "bussiness name": "BuildTech Constructions",
  username: "buildtech.hr",
  industry: "Construction",
  location: "Pune, Maharashtra",
  contact: "+91 20 4567 8900",
  email: "hr@buildtech.com",
  password: "password123",
  about: "We are a leading infrastructure development company specializing in high-rise commercial buildings and metro projects across Western India.",
  jobs: [
    { id: 1, title: "Senior Welder", date: "Oct 20, 2024", status: "Active", applicants: 12 },
    { id: 2, title: "Site Supervisor", date: "Oct 18, 2024", status: "Active", applicants: 8 },
    { id: 3, title: "Electrician", date: "Sep 30, 2024", status: "Closed", applicants: 45 },
  ]
};

// --- SHARED COMPONENTS ---
const Card = ({ children, className = "" }) => (
  <div className={`bg-slate-800 rounded-xl border border-slate-700 shadow-sm p-6 ${className}`}>
    {children}
  </div>
);

const SectionHeader = ({ title, icon: Icon, onEdit }) => (
  <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
    <div className="flex items-center gap-2">
      {Icon && <Icon size={18} className="text-blue-500" />}
      <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
    </div>
    {onEdit && (
      <button onClick={onEdit} className="text-xs flex items-center gap-1 text-slate-400 hover:text-blue-400 bg-slate-700/50 hover:bg-slate-700 px-2 py-1 rounded transition-colors">
        <PenTool size={12} /> Edit
      </button>
    )}
  </div>
);

const LabelValue = ({ label, value, isMasked = false }) => (
  <div className="mb-4">
    <p className="text-xs text-slate-400 font-medium mb-1">{label}</p>
    <div className="flex items-center gap-2">
      <p className="text-slate-100 text-sm md:text-base font-medium">
        {isMasked ? "•••• •••• " + (value ? value.slice(-4) : "0000") : value}
      </p>
      {isMasked && <EyeOff size={14} className="text-slate-500 cursor-pointer hover:text-blue-400" />}
    </div>
  </div>
);

const ActionButton = ({ children, variant = "primary", className = "", onClick }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 w-full"; 
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 active:scale-95",
    secondary: "bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 active:scale-95",
  };
  return <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>{children}</button>;
};

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-800 rounded-2xl w-full max-w-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b border-slate-700 bg-slate-900/50">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 hover:bg-slate-700 rounded-full"><X size={20} /></button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar">{children}</div>
      </div>
    </div>
  );
};

// --- FORM FIELDS ---
const InputField = ({ label, value, onChange, type = "text", placeholder = "" }) => (
  <div className="mb-4">
    <label className="block text-xs uppercase text-slate-400 font-bold mb-1 tracking-wider">{label}</label>
    <input 
      type={type} 
      value={value} 
      onChange={e => onChange(e.target.value)} 
      placeholder={placeholder}
      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 placeholder-slate-600" 
    />
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div className="mb-4">
    <label className="block text-xs uppercase text-slate-400 font-bold mb-1 tracking-wider">{label}</label>
    <select 
      value={value} 
      onChange={e => onChange(e.target.value)} 
      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 appearance-none"
    >
      <option value="" disabled>Select {label}</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const TextAreaField = ({ label, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-xs uppercase text-slate-400 font-bold mb-1 tracking-wider">{label}</label>
    <textarea rows={3} value={value} onChange={e => onChange(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
  </div>
);

const RadioGroup = ({ label, name, options, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-xs uppercase text-slate-400 font-bold mb-2 tracking-wider">{label}</label>
    <div className="flex gap-4">
      {options.map(opt => (
        <label key={opt} className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
          <input 
            type="radio" 
            name={name} 
            value={opt} 
            checked={value === opt} 
            onChange={() => onChange(opt)}
            className="accent-blue-500 w-4 h-4" 
          />
          <span className="text-sm">{opt}</span>
        </label>
      ))}
    </div>
  </div>
);

const CheckboxField = ({ label, checked, onChange }) => (
  <div className="mb-4 flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
    <input 
      type="checkbox" 
      checked={checked} 
      onChange={(e) => onChange(e.target.checked)}
      className="accent-blue-500 w-5 h-5 rounded" 
    />
    <label className="text-sm text-slate-200 font-medium cursor-pointer" onClick={() => onChange(!checked)}>{label}</label>
  </div>
);

const FormSectionTitle = ({ title }) => (
  <h4 className="text-blue-400 text-sm font-bold uppercase tracking-wider mb-4 mt-6 border-b border-slate-700 pb-2 flex items-center gap-2">
    {title}
  </h4>
);

// --- MAIN COMPONENT ---
export default function CompanyDashboard() {
  const [data, setData] = useState(COMPANY_DATA);
  const [modalType, setModalType] = useState(null);
  const [tempData, setTempData] = useState({});
  const [selectedJob, setSelectedJob] = useState(null);

  const handleEdit = (section, currentData) => {
    setTempData({ ...currentData });
    setModalType(section);
  };

  const handleSave = () => {
    setData({ ...data, ...tempData });
    setModalType(null);
  };

  const handlePostJob = () => {
    const newJob = {
      id: Date.now(),
      title: tempData.newJobTitle,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: "Active",
      applicants: 0
    };
    setData({ ...data, jobs: [newJob, ...data.jobs] });
    setModalType(null);
  };

  const handleViewApplicants = (job) => {
    setSelectedJob(job);
    setModalType('applicants');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* --- MODALS --- */}
        <Modal isOpen={modalType === 'org'} onClose={() => setModalType(null)} title="Edit Organization">
          <InputField label="Business Name" value={tempData["bussiness name"] || ''} onChange={(v) => setTempData({...tempData, "bussiness name": v})} />
          <InputField label="Username" value={tempData.username || ''} onChange={(v) => setTempData({...tempData, username: v})} />
          <InputField label="Contact" value={tempData.contact || ''} onChange={(v) => setTempData({...tempData, contact: v})} />
          <InputField label="Email" value={tempData.email || ''} onChange={(v) => setTempData({...tempData, email: v})} />
          <InputField label="Location" value={tempData.location || ''} onChange={(v) => setTempData({...tempData, location: v})} />
          <InputField label="Industry" value={tempData.industry || ''} onChange={(v) => setTempData({...tempData, industry: v})} />
          
          <div className="pt-4 flex justify-end gap-2">
            <ActionButton variant="secondary" onClick={() => setModalType(null)}>Cancel</ActionButton>
            <ActionButton onClick={handleSave}><Save size={16}/> Save</ActionButton>
          </div>
        </Modal>

        {/* Added Modal for About Section */}
        <Modal isOpen={modalType === 'about'} onClose={() => setModalType(null)} title="Edit About Business">
          <TextAreaField label="About Description" value={tempData.about || ''} onChange={(v) => setTempData({...tempData, about: v})} />
          <div className="pt-4 flex justify-end gap-2">
            <ActionButton variant="secondary" onClick={() => setModalType(null)}>Cancel</ActionButton>
            <ActionButton onClick={handleSave}><Save size={16}/> Save</ActionButton>
          </div>
        </Modal>

        {/* Applicants List Modal */}
        <Modal isOpen={modalType === 'applicants'} onClose={() => setModalType(null)} title={`Applicants for ${selectedJob?.title}`}>
           <div className="space-y-3">
               {/* Generating Mock Applicants for Demo */}
               {[1, 2, 3, 4, 5].map((id) => (
                   <div key={id} className="bg-slate-700/50 p-4 rounded-lg flex justify-between items-center border border-slate-600 hover:bg-slate-700 transition-colors">
                      <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-900/50">
                            A{id}
                          </div>
                          <div>
                              <p className="font-bold text-white text-sm md:text-base">Applicant Name {id}</p>
                              <div className="flex gap-2 text-xs text-slate-400 mt-0.5">
                                 <span>Experience: {id + 2} Years</span>
                                 <span>•</span>
                                 <span>Pune, MH</span>
                              </div>
                              <div className="flex gap-2 mt-2">
                                <span className="text-[10px] bg-slate-600/50 px-2 py-0.5 rounded text-slate-300">Certified Welder</span>
                                <span className="text-[10px] bg-slate-600/50 px-2 py-0.5 rounded text-slate-300">Immediate Joiner</span>
                              </div>
                          </div>
                      </div>
                      
                      {/* Contact Icon at the Right Most Part */}
                      <button className="bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded-lg transition-colors shadow-lg shadow-blue-900/30 active:scale-95 group" title="Contact Applicant">
                          <Phone size={18} className="group-hover:fill-current" />
                      </button>
                   </div>
               ))}
           </div>
           <div className="pt-4 flex justify-end">
              <ActionButton variant="secondary" onClick={() => setModalType(null)}>Close</ActionButton>
           </div>
        </Modal>

        <Modal isOpen={modalType === 'newJob'} onClose={() => setModalType(null)} title="Post New Job">
          <FormSectionTitle title="1. Job Overview" />
          <InputField label="Job Title" value={tempData.newJobTitle || ''} onChange={(v) => setTempData({...tempData, newJobTitle: v})} placeholder="e.g. Senior Welder" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <SelectField 
                label="Job Category" 
                value={tempData.jobCategory || ''} 
                onChange={(v) => setTempData({...tempData, jobCategory: v})}
                options={["Construction", "Electrical", "Plumbing", "Manufacturing", "Logistics", "Other"]} 
             />
             <SelectField 
                label="Job Type" 
                value={tempData.jobType || ''} 
                onChange={(v) => setTempData({...tempData, jobType: v})}
                options={["Full-time", "Contractual", "Daily Wage", "Part-time"]} 
             />
          </div>
          <InputField label="Total Vacancies" type="number" value={tempData.vacancies || ''} onChange={(v) => setTempData({...tempData, vacancies: v})} />

          <FormSectionTitle title="2. Candidate Requirements" />
          <InputField label="Required Skills (Comma separated)" value={tempData.skills || ''} onChange={(v) => setTempData({...tempData, skills: v})} placeholder="e.g. Welding, Safety, Metal Cutting" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <SelectField 
                label="Experience Required" 
                value={tempData.experience || ''} 
                onChange={(v) => setTempData({...tempData, experience: v})}
                options={["Fresher", "0-1 Year", "1-3 Years", "3-5 Years", "5+ Years"]} 
             />
             <SelectField 
                label="Minimum Education" 
                value={tempData.education || ''} 
                onChange={(v) => setTempData({...tempData, education: v})}
                options={["Below 10th", "10th Pass", "12th Pass", "ITI", "Diploma", "Graduate"]} 
             />
          </div>

          <FormSectionTitle title="3. Salary & Perks" />
          
          {/* Fixed Salary Input */}
          <InputField 
            label="Fixed Salary" 
            type="number" 
            value={tempData.salary || ''} 
            onChange={(v) => setTempData({...tempData, salary: v})} 
            placeholder="₹" 
          />
          
          <SelectField 
                label="Payment Frequency" 
                value={tempData.payFreq || ''} 
                onChange={(v) => setTempData({...tempData, payFreq: v})}
                options={["Monthly", "Weekly", "Daily", "Per Task"]} 
          />

          <CheckboxField 
            label="Paid Overtime Available?" 
            checked={tempData.overtime || false} 
            onChange={(v) => setTempData({...tempData, overtime: v})} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <RadioGroup 
               label="Accommodation" 
               name="accom"
               options={["Provided", "Not Provided"]}
               value={tempData.accommodation || ''}
               onChange={(v) => setTempData({...tempData, accommodation: v})}
            />
            <RadioGroup 
               label="Food / Canteen" 
               name="food"
               options={["Provided", "Subsidized", "Not Provided"]}
               value={tempData.food || ''}
               onChange={(v) => setTempData({...tempData, food: v})}
            />
          </div>

          <FormSectionTitle title="4. Location & Schedule" />
          <TextAreaField label="Work Location / Site Address" value={tempData.location || ''} onChange={(v) => setTempData({...tempData, location: v})} />
          <InputField label="Shift Timings" value={tempData.shift || ''} onChange={(v) => setTempData({...tempData, shift: v})} placeholder="e.g. 9:00 AM - 6:00 PM" />

          <div className="pt-6 flex justify-end gap-3 border-t border-slate-700 mt-6">
            <ActionButton variant="secondary" onClick={() => setModalType(null)}>Cancel</ActionButton>
            <ActionButton onClick={handlePostJob}><Plus size={16}/> Post Job</ActionButton>
          </div>
        </Modal>

        {/* --- HEADER --- */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Company Dashboard</h1>
            <p className="text-slate-400">{data["bussiness name"]}</p>
          </div>
          <div className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/30">
            Verified Recruiter
          </div>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Card 1: Organization Details with EDIT BUTTON */}
          <Card>
            <SectionHeader 
              title="Organization Details" 
              icon={Settings} 
              onEdit={() => handleEdit('org', data)} 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
               <div className="space-y-1">
                 <LabelValue label="Business Name" value={data["bussiness name"]} />
                 <LabelValue label="Username" value={data.username} />
                 <LabelValue label="Industry" value={data.industry} />
                 <LabelValue label="Location" value={data.location} />
               </div>
               <div className="space-y-1">
                 <LabelValue label="Contact" value={data.contact} />
                 <LabelValue label="Email" value={data.email} />
                 <div className="mb-4">
                    <p className="text-xs text-slate-400 font-medium mb-1">Password</p>
                    <div className="flex items-center gap-2">
                      <p className="text-slate-100 text-sm md:text-base font-medium">••••••••</p>
                      <Edit2 size={12} className="text-blue-500 cursor-pointer" />
                    </div>
                 </div>
               </div>
            </div>
          </Card>

          {/* Card 2: About Business with EDIT BUTTON */}
          <Card>
            <SectionHeader 
              title="About Business" 
              icon={FileText} 
              onEdit={() => handleEdit('about', data)} 
            />
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">{data.about}</p>
            <div className="mt-6 pt-6 border-t border-slate-700 flex gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{data.jobs.filter(j => j.status === 'Active').length}</p>
                <p className="text-xs text-slate-400 uppercase">Active Jobs</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">84</p>
                <p className="text-xs text-slate-400 uppercase">Total Hired</p>
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <div className="flex justify-between items-center mb-6">
            <SectionHeader title="Posted Jobs & Responses" icon={Briefcase} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-xs text-slate-400 uppercase tracking-wider">
                  <th className="p-4 font-medium">Job Title</th>
                  <th className="p-4 font-medium">Date Posted</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Responses</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-slate-300 text-sm">
                {data.jobs.map(job => (
                  <tr key={job.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td className="p-4 font-medium text-white">{job.title}</td>
                    <td className="p-4 text-slate-400">{job.date}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${job.status === 'Active' ? 'bg-green-900/30 text-green-400' : 'bg-slate-700 text-slate-400'}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => handleViewApplicants(job)}
                        className="text-blue-400 hover:text-blue-300 font-medium hover:underline flex items-center gap-1 transition-colors"
                      >
                        <Users size={14} /> 
                        <span>{job.applicants}</span>
                        <span className="hidden sm:inline">Applicants</span>
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-slate-400 hover:text-white">Manage</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* --- FOOTER ACTIONS --- */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-800">
           <ActionButton variant="primary" className="flex-1" onClick={() => { setTempData({}); setModalType('newJob'); }}>
              <Plus size={16}/> Post New Job
           </ActionButton>
        </div>

      </div>
    </div>
  );
}