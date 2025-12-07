import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getJobSeekerProfile, updateJobSeeker } from '../services/JobSeekerServices';
import { setUserData } from '../store/slices/userSlice';
import { Loader2, X, Plus } from 'lucide-react';

const JobSeekerDashboard = () => {
    // Redux
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    // Local State
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(null); // 'editProfile' | 'editSkills' | null
    const [tempData, setTempData] = useState({});
    const [saving, setSaving] = useState(false);
    const [newSkill, setNewSkill] = useState("");


    // Mock data for things we don't have backend logic for yet
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

    // Load Data
    useEffect(() => {
        const fetchData = async () => {
            if (!user?._id) return;
            setLoading(true);
            try {
                // If the user registered as a job seeker, 'user' object might have the basic details
                // But we fetch fresh profile data to be sure
                const data = await getJobSeekerProfile(user._id);
                if (data) {
                    setProfileData(data);
                    // Optionally update Redux if needed, but keeping local state is fine for dashboard
                } else {
                    // Fallback to redux user if API fails or returns nothing (e.g. initial render)
                    setProfileData(user); 
                }
            } catch (error) {
                console.error("Failed to load profile", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user?._id]);


    // Handlers
    const handleSaveProfile = async () => {
        if (!user?._id) return;
        setSaving(true);
        try {
            const updated = await updateJobSeeker(user._id, tempData);
            if (updated && updated.success) {
                setProfileData(updated.data);
                dispatch(setUserData(updated.data)); // Sync Redux
                setModal(null);
            } else {
                alert("Failed to update profile");
            }
        } catch (error) {
            console.error("Update failed", error);
            alert("Error updating profile");
        } finally {
            setSaving(false);
        }
    };

    const handleAddSkill = () => {
        if(newSkill.trim()) {
            setTempData(prev => ({
                ...prev,
                skills: [...(prev.skills || []), newSkill.trim()]
            }));
            setNewSkill("");
        }
    }

    const handleRemoveSkill = (skillToRemove) => {
        setTempData(prev => ({
            ...prev,
            skills: prev.skills.filter(s => s !== skillToRemove)
        }));
    }

    const openEditProfile = () => {
        setTempData({ ...profileData });
        setModal('editProfile');
    }

    const openEditSkills = () => {
        setTempData({ ...profileData });
        setModal('editSkills');
    }


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#1a202c] text-white">
                <Loader2 className="animate-spin mr-2" /> Loading Dashboard...
            </div>
        );
    }

    // Use profileData or fallbacks
    const displayData = profileData || user || {};

    return (
        <div className="bg-[#1a202c] min-h-screen text-white p-6 font-sans">
            <div className="container mx-auto max-w-7xl">

                {/* Header */}
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Welcome back, {displayData.name || displayData.username || 'User'}!</h1>
                        <p className="text-gray-400 mt-1">Here's what's happening with your job search today.</p>
                    </div>
                    <div className="bg-[#2d3748] px-4 py-2 rounded-lg border border-gray-700">
                        <span className="text-gray-400 text-sm">Profile Views</span>
                        <div className="text-2xl font-bold text-[#3182ce]">{profileViews}</div>
                    </div>
                </header>

                {/* Top Section: Profile & Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

                    {/* Left Card: Profile Summary */}
                    <div className="bg-[#2d3748] rounded-xl p-6 shadow-lg border border-gray-700 relative">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-white">My Profile</h2>
                            <button onClick={openEditProfile} className="text-[#3182ce] text-sm hover:underline">Edit</button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-gray-700 pb-2">
                                <span className="text-gray-400">Name</span>
                                <span className="font-medium">{displayData.name || 'Not Added'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-700 pb-2">
                                <span className="text-gray-400">Username</span>
                                <span className="font-medium">{displayData.username}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-700 pb-2">
                                <span className="text-gray-400">Location</span>
                                <span className="font-medium">{displayData.location || 'Not Added'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-700 pb-2">
                                <span className="text-gray-400">Phone</span>
                                <span className="font-medium">{displayData.phone || 'Not Added'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-700 pb-2">
                                <span className="text-gray-400">Email</span>
                                <span className="font-medium">{displayData.email}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Card: Personal Details & Documents */}
                    <div className="bg-[#2d3748] rounded-xl p-6 shadow-lg border border-gray-700 relative">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-white">Details & Credentials</h2>
                            <button onClick={openEditProfile} className="text-[#3182ce] text-sm hover:underline">Update</button>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Age</p>
                                    <p className="font-medium text-lg">{displayData.age ? `${displayData.age} years` : 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Aadhaar Number</p>
                                    <p className="font-medium text-lg">{displayData.aadhar || 'Not Added'}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-gray-400 text-sm mb-1">Highest Education</p>
                                <p className="font-medium text-lg">{displayData.education || 'Not Added'}</p>
                            </div>

                            <div className="pt-4 border-t border-gray-700">
                                <p className="text-gray-400 text-sm mb-3">Documents</p>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-green-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <span className="text-white">Resume {displayData.resume ? '(Uploaded)' : '(Not Uploaded)'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Section: Skills & Preferences */}
                <div className="bg-[#2d3748] rounded-xl p-6 shadow-lg border border-gray-700 mb-8 relative">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-white">Skills & Job Target</h2>
                        <button onClick={openEditSkills} className="text-[#3182ce] text-sm hover:underline">Edit Skills</button>
                    </div>

                    <div className="mb-6">
                        <p className="text-gray-400 text-sm mb-3">Skills</p>
                        <div className="flex flex-wrap gap-3">
                            {displayData.skills && displayData.skills.length > 0 ? displayData.skills.map((skill, idx) => (
                                <span key={idx} className="bg-[#3182ce] text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
                                    {skill}
                                </span>
                            )) : (
                                <span className="text-gray-500 italic">No skills added yet. Click Edit to add.</span>
                            )}
                        </div>
                    </div>

                    <div>
                        <p className="text-gray-400 text-sm mb-2">Looking For</p>
                        <p className="text-lg font-medium">Full-time position (Preference not set)</p>
                    </div>
                </div>

                {/* Bottom Section: Activity Tracking */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    {/* Card 1: Learning Path */}
                    <div className="bg-[#2d3748] rounded-xl p-6 shadow-lg border border-gray-700">
                        <div className="flex items-center gap-2 mb-4 text-[#3182ce]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                            <h3 className="font-semibold text-white">Learning Path</h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">Currently Pursuing:</p>
                        <p className="font-medium mb-4">Advanced Solar Systems Certification</p>

                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-[#3182ce] font-bold">{learningProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-[#3182ce] h-2.5 rounded-full" style={{ width: `${learningProgress}%` }}></div>
                        </div>
                    </div>

                    {/* Card 2: Application Responses */}
                    <div className="bg-[#2d3748] rounded-xl p-6 shadow-lg border border-gray-700">
                        <h3 className="font-semibold text-white mb-4">Application Responses</h3>
                        <div className="space-y-4">
                            {recentApplications.map((app, idx) => (
                                <div key={idx} className="border-l-2 border-gray-600 pl-3">
                                    <p className="font-medium text-sm">{app.title}</p>
                                    <p className={`text-xs ${app.statusColor} font-medium`}>{app.status}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Card 3: Recommended Opportunities */}
                    <div className="bg-[#2d3748] rounded-xl p-6 shadow-lg border border-gray-700">
                        <h3 className="font-semibold text-white mb-4">Recommended Opportunities</h3>
                        <div className="space-y-4">
                            {recommendedJobs.map((job, idx) => (
                                <div key={idx} className="pb-3 border-b border-gray-700 last:border-0 last:pb-0">
                                    <p className="font-medium text-sm">{job.title}</p>
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
                <div className="flex flex-wrap gap-4">
                    <button onClick={openEditProfile} className="bg-[#3182ce] hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md">
                        Update Profile
                    </button>
                    <button className="bg-transparent border border-[#3182ce] text-[#3182ce] hover:bg-[#3182ce] hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                        Browse All Jobs
                    </button>
                </div>
            </div>

            {/* --- MODAL: EDIT PROFILE --- */}
            {modal === 'editProfile' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-[#2d3748] w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
                        <div className="flex justify-between items-center p-6 border-b border-gray-700">
                            <h3 className="text-xl font-bold text-white">Edit Profile</h3>
                            <button onClick={() => setModal(null)} className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-700"><X size={20} /></button>
                        </div>
                        <div className="p-6 overflow-y-auto custom-scrollbar space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 mb-1 text-sm">Full Name</label>
                                    <input type="text" value={tempData.name || ''} onChange={e => setTempData({ ...tempData, name: e.target.value })} className="w-full bg-gray-700 border-gray-600 rounded p-2 text-white focus:outline-none focus:border-[#3182ce]" />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-1 text-sm">Age</label>
                                    <input type="number" value={tempData.age || ''} onChange={e => setTempData({ ...tempData, age: e.target.value })} className="w-full bg-gray-700 border-gray-600 rounded p-2 text-white focus:outline-none focus:border-[#3182ce]" />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-1 text-sm">Phone</label>
                                    <input type="text" value={tempData.phone || ''} onChange={e => setTempData({ ...tempData, phone: e.target.value })} className="w-full bg-gray-700 border-gray-600 rounded p-2 text-white focus:outline-none focus:border-[#3182ce]" />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-1 text-sm">Location</label>
                                    <input type="text" value={tempData.location || ''} onChange={e => setTempData({ ...tempData, location: e.target.value })} className="w-full bg-gray-700 border-gray-600 rounded p-2 text-white focus:outline-none focus:border-[#3182ce]" />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-1 text-sm">Highest Education</label>
                                    <input type="text" value={tempData.education || ''} onChange={e => setTempData({ ...tempData, education: e.target.value })} className="w-full bg-gray-700 border-gray-600 rounded p-2 text-white focus:outline-none focus:border-[#3182ce]" />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-1 text-sm">Aadhaar Number</label>
                                    <input type="text" value={tempData.aadhar || ''} onChange={e => setTempData({ ...tempData, aadhar: e.target.value })} className="w-full bg-gray-700 border-gray-600 rounded p-2 text-white focus:outline-none focus:border-[#3182ce]" />
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-700 flex justify-end gap-3">
                            <button onClick={() => setModal(null)} className="px-4 py-2 rounded border border-gray-600 text-gray-300 hover:bg-gray-700">Cancel</button>
                            <button onClick={handleSaveProfile} disabled={saving} className="px-4 py-2 rounded bg-[#3182ce] text-white hover:bg-blue-600 disabled:opacity-50">
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- MODAL: EDIT SKILLS --- */}
            {modal === 'editSkills' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-[#2d3748] w-full max-w-lg rounded-2xl shadow-2xl flex flex-col">
                        <div className="flex justify-between items-center p-6 border-b border-gray-700">
                            <h3 className="text-xl font-bold text-white">Edit Skills</h3>
                            <button onClick={() => setModal(null)} className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-700"><X size={20} /></button>
                        </div>
                        <div className="p-6">
                             <div className="flex gap-2 mb-4">
                                <input 
                                    type="text" 
                                    value={newSkill} 
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    placeholder="Add a new skill (e.g. Wiring)" 
                                    className="flex-1 bg-gray-700 border-gray-600 rounded p-2 text-white focus:outline-none focus:border-[#3182ce]"
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                                />
                                <button onClick={handleAddSkill} className="bg-green-600 hover:bg-green-500 text-white p-2 rounded"><Plus size={20}/></button>
                             </div>
                             <div className="flex flex-wrap gap-2">
                                {tempData.skills?.map((skill, idx) => (
                                    <span key={idx} className="bg-blue-900 text-blue-100 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                        {skill}
                                        <button onClick={() => handleRemoveSkill(skill)} className="hover:text-red-400"><X size={14}/></button>
                                    </span>
                                ))}
                             </div>
                        </div>
                        <div className="p-6 border-t border-gray-700 flex justify-end gap-3">
                            <button onClick={() => setModal(null)} className="px-4 py-2 rounded border border-gray-600 text-gray-300 hover:bg-gray-700">Cancel</button>
                            <button onClick={handleSaveProfile} disabled={saving} className="px-4 py-2 rounded bg-[#3182ce] text-white hover:bg-blue-600 disabled:opacity-50">
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobSeekerDashboard;
