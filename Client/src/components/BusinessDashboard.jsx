import React from 'react';
import { useSelector } from 'react-redux';

const BusinessDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  // Mock data for display
  const jobPostings = [
    { title: "Senior Welder", datePosted: "Oct 20", status: "Active", applicants: 12, statusColor: "text-green-400" },
    { title: "Site Supervisor", datePosted: "Oct 15", status: "Active", applicants: 8, statusColor: "text-green-400" },
    { title: "Electrician Helper", datePosted: "Oct 10", status: "Closed", applicants: 24, statusColor: "text-red-400" },
    { title: "Safety Officer", datePosted: "Sep 28", status: "Closed", applicants: 15, statusColor: "text-red-400" },
  ];

  return (
    <div className="bg-[#1a202c] min-h-screen text-white p-6 font-sans">
      <div className="container mx-auto max-w-7xl">

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Company Dashboard - {user?.companyName || 'TechSol Industries'}</h1>
          <p className="text-gray-400 mt-1">Manage your job postings and view applicant responses.</p>
        </header>

        {/* Top Section: Business Profile & About */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* Left Card: Organization Details */}
          <div className="bg-[#2d3748] rounded-xl p-6 shadow-lg border border-gray-700 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Organization Details</h2>
              <button className="text-[#3182ce] text-sm hover:underline">Edit</button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Contact Name</span>
                <span className="font-medium">{user?.name || 'Vikram Singh'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Username</span>
                <span className="font-medium">{user?.username || 'vikram.techsol'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Location</span>
                <span className="font-medium">{user?.location || 'Pune, Maharashtra'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Phone</span>
                <span className="font-medium">{user?.phone || '+91 98220 12345'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Email</span>
                <span className="font-medium">{user?.email || 'hr@techsol.com'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">GSTIN Number</span>
                <span className="font-medium">27AAAAA0000A1Z5</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Industry Type</span>
                <span className="font-medium">Manufacturing & Engineering</span>
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

          {/* Right Card: About Business */}
          <div className="bg-[#2d3748] rounded-xl p-6 shadow-lg border border-gray-700 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Company Description</h2>
              <button className="text-[#3182ce] text-sm hover:underline">Update</button>
            </div>
            <div className="text-gray-300 leading-relaxed">
              <p>
                TechSol Industries is a leading provider of industrial engineering solutions, specializing in solar power infrastructure and heavy machinery maintenance. Established in 2010, we have grown to a workforce of over 500 skilled professionals. We are committed to safety, innovation, and sustainable practices. We are constantly looking for skilled technicians, welders, and engineers to join our growing team.
              </p>
              <p className="mt-4">
                Our headquarters are located in Pune, with project sites across Maharashtra and Gujarat. We offer competitive salaries, comprehensive benefits, and opportunities for career advancement.
              </p>
            </div>
          </div>
        </div>

        {/* Main Section: Hiring Hub */}
        <div className="bg-[#2d3748] rounded-xl p-6 shadow-lg border border-gray-700 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Posted Jobs & Responses</h2>
            <button className="bg-[#3182ce] hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
              + Post New Job
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 border-b border-gray-600 text-sm uppercase tracking-wider">
                  <th className="py-3 px-4 font-medium">Job Title</th>
                  <th className="py-3 px-4 font-medium">Date Posted</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium">Responses Received</th>
                  <th className="py-3 px-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {jobPostings.map((job, idx) => (
                  <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                    <td className="py-4 px-4 font-medium text-white">{job.title}</td>
                    <td className="py-4 px-4 text-gray-300">{job.datePosted}</td>
                    <td className={`py-4 px-4 font-medium ${job.statusColor}`}>{job.status}</td>
                    <td className="py-4 px-4">
                      <button className="text-[#3182ce] hover:text-blue-400 font-medium hover:underline">
                        [ {job.applicants} Applicants ]
                      </button>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button className="text-gray-400 hover:text-white mx-2">Edit</button>
                      <button className="text-red-400 hover:text-red-300 mx-2">Close</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Action Space */}
        <div className="flex flex-wrap gap-4">
          <button className="bg-[#3182ce] hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md">
            Post New Job
          </button>
          <button className="bg-transparent border border-[#3182ce] text-[#3182ce] hover:bg-[#3182ce] hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Manage Subscription
          </button>
          <button className="bg-transparent border border-gray-500 text-gray-300 hover:bg-gray-700 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Edit Company Settings
          </button>
        </div>

      </div>
    </div>
  );
};

export default BusinessDashboard;
