import React from 'react';
import { useSelector } from 'react-redux';

const JobSeekerDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { skills } = useSelector((state) => state.user);

  // Mock data for display
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

  return (
    <div className="bg-[#1a202c] min-h-screen text-white p-6 font-sans">
      <div className="container mx-auto max-w-7xl">

        {/* Header */}
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.name || 'User'}!</h1>
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
              <button className="text-[#3182ce] text-sm hover:underline">Edit</button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Name</span>
                <span className="font-medium">{user?.name || 'Rajesh Kumar'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Username</span>
                <span className="font-medium">{user?.username || 'rajesh.kumar'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Location</span>
                <span className="font-medium">{user?.location || 'Mumbai, Maharashtra'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Phone</span>
                <span className="font-medium">{user?.phone || '+91 98765 43210'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Email</span>
                <span className="font-medium">{user?.email || 'rajesh.kumar@email.com'}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-400">Password</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium tracking-widest">********</span>
                  <button className="text-[#3182ce] text-xs hover:text-blue-400">Change</button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card: Personal Details & Documents */}
          <div className="bg-[#2d3748] rounded-xl p-6 shadow-lg border border-gray-700 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Details & Credentials</h2>
              <button className="text-[#3182ce] text-sm hover:underline">Update</button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Age</p>
                  <p className="font-medium text-lg">32 years</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Aadhaar Number</p>
                  <p className="font-medium text-lg">XXXX XXXX 4567</p>
                </div>
              </div>

              <div>
                <p className="text-gray-400 text-sm mb-1">Highest Education</p>
                <p className="font-medium text-lg">ITI - Electrician Trade</p>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <p className="text-gray-400 text-sm mb-3">Documents</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-green-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="text-white">Resume (PDF)</span>
                  </div>
                  <div className="flex items-center gap-3 text-green-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="text-white">Certificates (3 submitted)</span>
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
            <button className="text-[#3182ce] text-sm hover:underline">Edit Skills</button>
          </div>

          <div className="mb-6">
            <p className="text-gray-400 text-sm mb-3">Skills</p>
            <div className="flex flex-wrap gap-3">
              {skills && skills.length > 0 ? skills.map((skill, idx) => (
                <span key={idx} className="bg-[#3182ce] text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
                  {skill}
                </span>
              )) : (
                <>
                  <span className="bg-[#3182ce] text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">Solar Panel Installation L1</span>
                  <span className="bg-[#3182ce] text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">Electrical Wiring</span>
                  <span className="bg-[#3182ce] text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">Safety Compliance</span>
                  <span className="bg-[#3182ce] text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">Team Coordination</span>
                  <span className="bg-[#3182ce] text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">Blueprint Reading</span>
                </>
              )}
            </div>
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-2">Looking For</p>
            <p className="text-lg font-medium">Full-time position in Solar Installation & Electrical Maintenance</p>
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
          <button className="bg-[#3182ce] hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md">
            Update Profile
          </button>
          <button className="bg-transparent border border-[#3182ce] text-[#3182ce] hover:bg-[#3182ce] hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Browse All Jobs
          </button>
        </div>

      </div>
    </div>
  );
};

export default JobSeekerDashboard;
