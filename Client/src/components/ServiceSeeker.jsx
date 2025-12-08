import React, { useState } from 'react';
import {
    User, Clock, Hammer, Settings, Phone, Plus,
    X, Save, PenTool, EyeOff, MapPin, Calendar, DollarSign,
    PlayCircle, PauseCircle, Trash2, CheckCircle
} from 'lucide-react';

// --- DATA ---
const USER_DATA = {
    name: "Priya Desai",
    username: "priya_d",
    location: "Bangalore, Karnataka",
    phone: "+91 99887 76655",
    email: "priya.desai@example.com",
    tasks: [
        { id: 1, title: "Carpenter", description: "Fixing broken chair leg", status: "Open", responses: 3, budget: "500" },
        { id: 2, title: "Plumber", description: "Kitchen sink leaking", status: "Closed", responses: 5, budget: "800" },
    ]
};

// --- MAIN COMPONENT ---
export default function GeneralUserDashboard() {
    const [data, setData] = useState(USER_DATA);
    const [modalType, setModalType] = useState(null);
    const [tempData, setTempData] = useState({});
    const [selectedTask, setSelectedTask] = useState(null);

    const handleEdit = (section, currentData) => {
        setTempData({ ...currentData });
        setModalType(section);
    };

    const handleSave = () => {
        setData({ ...data, ...tempData });
        setModalType(null);
    };

    const handlePostTask = () => {
        const newTask = {
            id: Date.now(),
            title: tempData.category || "General Task",
            description: tempData.description,
            location: tempData.location,
            budget: tempData.budget,
            status: "Open",
            responses: 0
        };
        setData({ ...data, tasks: [newTask, ...data.tasks] });
        setModalType(null);
    };

    // --- NEW FUNCTIONS FOR TASK MANAGEMENT ---
    const handleStatusChange = (id, newStatus) => {
        const updatedTasks = data.tasks.map(task => {
            if (task.id === id) {
                return { ...task, status: newStatus };
            }
            return task;
        });
        setData({ ...data, tasks: updatedTasks });
        setModalType(null);
    };

    const handleDeleteTask = (id) => {
        if (confirm("Are you sure you want to delete this task? This action cannot be undone.")) {
            const updatedTasks = data.tasks.filter(task => task.id !== id);
            setData({ ...data, tasks: updatedTasks });
            setModalType(null);
        }
    };

    const openManageModal = (task) => {
        setSelectedTask(task);
        setModalType('manage');
    };

    // Helper styles
    const cardClass = "bg-slate-800 rounded-xl border border-slate-700 shadow-sm p-6";
    const modalOverlayClass = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn";
    const modalContentClass = "bg-slate-800 rounded-2xl w-full max-w-lg border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]";
    const inputClass = "w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 placeholder-slate-600";
    const buttonBase = "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2";
    const btnPrimary = `${buttonBase} bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 active:scale-95`;
    const btnSecondary = `${buttonBase} bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 active:scale-95`;

    // Helper for status badge color
    const getStatusColor = (status) => {
        switch (status) {
            case 'Open': return 'bg-green-900/30 text-green-400 border border-green-900/50';
            case 'Suspended': return 'bg-yellow-900/30 text-yellow-400 border border-yellow-900/50';
            case 'Closed': return 'bg-slate-700 text-slate-400 border border-slate-600';
            default: return 'bg-slate-700 text-slate-400';
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* --- MODAL: POST NEW TASK --- */}
                {modalType === 'newTask' && (
                    <div className={modalOverlayClass}>
                        <div className={modalContentClass}>
                            <div className="flex justify-between items-center p-4 border-b border-slate-700 bg-slate-900/50">
                                <h3 className="text-xl font-bold text-white">Post Quick Task</h3>
                                <button onClick={() => setModalType(null)} className="text-slate-400 hover:text-white p-1 hover:bg-slate-700 rounded-full"><X size={20} /></button>
                            </div>
                            <div className="p-6 overflow-y-auto custom-scrollbar">
                                <div className="mb-4">
                                    <label className="block text-xs uppercase text-slate-400 font-bold mb-1 tracking-wider">1. Service Category</label>
                                    <input type="text" value={tempData.category || ''} onChange={(e) => setTempData({ ...tempData, category: e.target.value })} placeholder="e.g. Carpenter, Electrician" className={inputClass} />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-xs uppercase text-slate-400 font-bold mb-1 tracking-wider">2. Task Description</label>
                                    <textarea rows={4} value={tempData.description || ''} onChange={(e) => setTempData({ ...tempData, description: e.target.value })} placeholder="Describe the work in detail..." className={inputClass} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="mb-4">
                                        <label className="block text-xs uppercase text-slate-400 font-bold mb-1 tracking-wider">3. Location</label>
                                        <input type="text" value={tempData.location || ''} onChange={(e) => setTempData({ ...tempData, location: e.target.value })} placeholder="e.g. Indiranagar" className={inputClass} />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-xs uppercase text-slate-400 font-bold mb-1 tracking-wider">4. Schedule</label>
                                        <input type="text" value={tempData.schedule || ''} onChange={(e) => setTempData({ ...tempData, schedule: e.target.value })} placeholder="e.g. Tomorrow 10 AM" className={inputClass} />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-xs uppercase text-slate-400 font-bold mb-1 tracking-wider">5. Expected Budget</label>
                                    <input type="number" value={tempData.budget || ''} onChange={(e) => setTempData({ ...tempData, budget: e.target.value })} placeholder="₹" className={inputClass} />
                                </div>

                                <div className="pt-4 flex justify-end gap-2 border-t border-slate-700 mt-4">
                                    <button onClick={() => setModalType(null)} className={btnSecondary}>Cancel</button>
                                    <button onClick={handlePostTask} className={btnPrimary}><Plus size={16} /> Post Task</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- MODAL: MANAGE TASK (NEW) --- */}
                {modalType === 'manage' && (
                    <div className={modalOverlayClass}>
                        <div className={modalContentClass}>
                            <div className="flex justify-between items-center p-4 border-b border-slate-700 bg-slate-900/50">
                                <h3 className="text-xl font-bold text-white">Manage Task</h3>
                                <button onClick={() => setModalType(null)} className="text-slate-400 hover:text-white p-1 hover:bg-slate-700 rounded-full"><X size={20} /></button>
                            </div>
                            <div className="p-6">
                                <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-700 mb-6">
                                    <h4 className="text-white font-bold text-lg">{selectedTask?.title}</h4>
                                    <p className="text-slate-400 text-sm mt-1">{selectedTask?.description}</p>
                                    <div className="flex gap-2 mt-3">
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${getStatusColor(selectedTask?.status)}`}>
                                            Current Status: {selectedTask?.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <p className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-2">Change Status</p>

                                    <button
                                        onClick={() => handleStatusChange(selectedTask.id, 'Open')}
                                        className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${selectedTask?.status === 'Open' ? 'bg-green-900/20 border-green-500/50 text-green-400' : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700'}`}
                                    >
                                        <PlayCircle size={18} />
                                        <div className="text-left">
                                            <span className="block font-medium">Active / Open</span>
                                            <span className="text-xs opacity-70">Visible to all workers. Acceptance is open.</span>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => handleStatusChange(selectedTask.id, 'Suspended')}
                                        className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${selectedTask?.status === 'Suspended' ? 'bg-yellow-900/20 border-yellow-500/50 text-yellow-400' : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700'}`}
                                    >
                                        <PauseCircle size={18} />
                                        <div className="text-left">
                                            <span className="block font-medium">Temporarily Suspend</span>
                                            <span className="text-xs opacity-70">Hidden from search, but data is preserved.</span>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => handleStatusChange(selectedTask.id, 'Closed')}
                                        className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${selectedTask?.status === 'Closed' ? 'bg-slate-600 border-slate-500 text-white' : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700'}`}
                                    >
                                        <CheckCircle size={18} />
                                        <div className="text-left">
                                            <span className="block font-medium">Close Task</span>
                                            <span className="text-xs opacity-70">Mark as completed. No new responses.</span>
                                        </div>
                                    </button>

                                    <div className="h-px bg-slate-700 my-4"></div>

                                    <button
                                        onClick={() => handleDeleteTask(selectedTask.id)}
                                        className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border border-red-900/50 bg-red-900/20 text-red-400 hover:bg-red-900/40 transition-colors font-medium"
                                    >
                                        <Trash2 size={18} /> Delete Task Permanently
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- MODAL: RESPONSES --- */}
                {modalType === 'responses' && (
                    <div className={modalOverlayClass}>
                        <div className={modalContentClass}>
                            <div className="flex justify-between items-center p-4 border-b border-slate-700 bg-slate-900/50">
                                <h3 className="text-xl font-bold text-white">Responses for {selectedTask?.title}</h3>
                                <button onClick={() => setModalType(null)} className="text-slate-400 hover:text-white p-1 hover:bg-slate-700 rounded-full"><X size={20} /></button>
                            </div>
                            <div className="p-6 overflow-y-auto custom-scrollbar">
                                <div className="space-y-3">
                                    <div className="bg-slate-700/50 p-3 rounded flex justify-between items-center border border-slate-600">
                                        <div className="flex gap-3 items-center">
                                            <div className="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white">R1</div>
                                            <div>
                                                <p className="font-bold text-white">Ramesh Plumber</p>
                                                <p className="text-xs text-slate-400">4.5 Stars • ₹500/hr</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="bg-green-600 text-white p-2 rounded hover:bg-green-500"><Phone size={14} /></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4 flex justify-end">
                                    <button onClick={() => setModalType(null)} className={btnSecondary}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- HEADER --- */}
                <div className="flex justify-between items-end border-b border-slate-800 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome, {data.name.split(' ')[0]}</h1>
                        <p className="text-slate-400">Need help around the house or office?</p>
                    </div>
                    <button onClick={() => { setTempData({}); setModalType('newTask'); }} className={btnPrimary}><Hammer size={16} /> Post Quick Task</button>
                </div>

                {/* --- CONTENT --- */}
                <div className={cardClass}>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-blue-600/20 p-2 rounded-lg text-blue-500">
                            <Clock size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Short-Term Jobs You've Posted</h3>
                            <p className="text-slate-400 text-xs">Manage your requests for carpenters, plumbers, etc.</p>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-4">
                        {data.tasks.map(task => (
                            <div key={task.id} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 flex flex-col md:flex-row justify-between items-center gap-4 hover:border-blue-500/50 transition-all">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                        <h4 className="text-white font-medium text-lg">{task.title}</h4>
                                        <span className={`px-2 py-0.5 text-xs rounded font-bold border ${getStatusColor(task.status)}`}>
                                            {task.status}
                                        </span>
                                    </div>
                                    <p className="text-slate-400 text-sm mt-1">{task.description}</p>

                                    {(task.location || task.budget) && (
                                        <div className="flex gap-4 mt-3 text-xs text-slate-500">
                                            {task.location && <span className="flex items-center gap-1"><MapPin size={12} /> {task.location}</span>}
                                            {task.budget && <span className="flex items-center gap-1 text-green-400"><DollarSign size={12} /> ₹{task.budget}</span>}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-4 w-full md:w-auto">
                                    {/* View Responses Button */}
                                    {task.status !== 'Closed' ? (
                                        <button
                                            onClick={() => { setSelectedTask(task); setModalType('responses'); }}
                                            className={`${btnPrimary} w-full md:w-auto`}
                                        >
                                            View {task.responses} Responses
                                        </button>
                                    ) : (
                                        <button className="flex-1 md:flex-none bg-slate-700 text-slate-400 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed border border-slate-600">
                                            Task Closed
                                        </button>
                                    )}

                                    {/* Manage Button (Settings Icon) */}
                                    <button
                                        onClick={() => openManageModal(task)}
                                        className="text-slate-400 hover:text-white p-2 rounded hover:bg-slate-700 transition-colors"
                                        title="Manage Task"
                                    >
                                        <Settings size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}