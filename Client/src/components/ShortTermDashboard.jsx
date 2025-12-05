import React from 'react';
import { useSelector } from 'react-redux';

const ShortTermDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  // Mock data for display
  const quickTasks = [
    { title: "Need a Carpenter for Furniture Repair", status: "Open", responses: 3, statusColor: "text-green-400" },
    { title: "Plumber for Kitchen Sink Leak", status: "In Progress", responses: 5, statusColor: "text-blue-400" },
    { title: "Electrician for Fan Installation", status: "Completed", responses: 2, statusColor: "text-gray-400" },
  ];

  return (
    <div className="bg-[#1a202c] min-h-screen text-white p-6 font-sans">
      <div className="container mx-auto max-w-7xl">

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Welcome, {user?.name || 'User'}</h1>
          <p className="text-gray-400 mt-1">Manage your quick tasks and service requests.</p>
        </header>

        {/* Top Section: User Profile */}
        <div className="bg-[#2d3748] rounded-xl p-6 shadow-lg border border-gray-700 mb-8 relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">My Account Details</h2>
            <button className="text-[#3182ce] text-sm hover:underline">Edit Profile</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <span className="text-gray-400 block text-sm mb-1">Name</span>
              <span className="font-medium text-lg">{user?.name || 'Amit Sharma'}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-sm mb-1">Username</span>
              <span className="font-medium text-lg">{user?.username || 'amit.sharma'}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-sm mb-1">Location</span>
              <span className="font-medium text-lg">{user?.location || 'Delhi, India'}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-sm mb-1">Phone</span>
              <span className="font-medium text-lg">{user?.phone || '+91 98765 00000'}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-sm mb-1">Email</span>
              <span className="font-medium text-lg">{user?.email || 'amit@example.com'}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-sm mb-1">Password</span>
              <div className="flex items-center gap-2">
                <span className="font-medium tracking-widest">********</span>
                <button className="text-[#3182ce] text-xs hover:text-blue-400">Change</button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Section: My Quick Tasks */}
        <div className="bg-[#2d3748] rounded-xl p-6 shadow-lg border border-gray-700 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Short-Term Jobs You've Posted</h2>
              <p className="text-gray-400 text-sm mt-1">Manage your requests for carpenters, plumbers, etc.</p>
            </div>
            <button className="bg-[#3182ce] hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
              + Post Task
            </button>
          </div>

          <div className="space-y-4">
            {quickTasks.map((task, idx) => (
              <div key={idx} className="bg-[#1a202c] rounded-lg p-5 border border-gray-600 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-[#3182ce] transition-colors">
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">{task.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-medium ${task.statusColor}`}>● {task.status}</span>
                    <span className="text-gray-500 text-sm">|</span>
                    <span className="text-gray-400 text-sm">Posted 2 days ago</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                  <button className="flex-1 md:flex-none bg-[#3182ce]/10 text-[#3182ce] hover:bg-[#3182ce] hover:text-white border border-[#3182ce] px-4 py-2 rounded-lg font-medium transition-all text-sm">
                    View {task.responses} Responses
                  </button>
                  <button className="text-gray-400 hover:text-white p-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Action Space */}
        <div className="flex flex-wrap gap-4">
          <button className="bg-[#3182ce] hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md">
            Post a Quick Task
          </button>
          <button className="bg-transparent border border-[#3182ce] text-[#3182ce] hover:bg-[#3182ce] hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Edit Profile
          </button>
        </div>

      </div>
    </div>
  );
};

export default ShortTermDashboard;
