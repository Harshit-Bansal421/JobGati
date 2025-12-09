import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, XCircle, ArrowRight, CheckCircle, BookOpen, Briefcase } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfileData } from '../store/slices/clerkSlice';

const CareerInterview = ({ onBack }) => {
    const { profileData } = useSelector(state => state.clerk);
    // Stages: 'AIM' -> 'FETCHING_QUESTIONS' -> 'INTERVIEW' -> 'ANALYZING' -> 'REPORT'
    const [stage, setStage] = useState('AIM');
    const [aim, setAim] = useState('');
    const [questions, setQuestions] = useState([]);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [report, setReport] = useState(null);


    const handleFindJobs = () => {
        dispatch(updateProfileData({ desiredPosition: aim }));
        navigate('/', { state: { targetSection: 'job-matching' } });

        setTimeout(() => {
            const element = document.getElementById('job-matching');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleFindResources = () => {
        const courses = report?.weak_skills_courses || [];
        dispatch(updateProfileData({
            desiredPosition: aim,
            recommendedCourses: courses
        }));
        navigate('/', { state: { targetSection: 'training-bridge' } });

        setTimeout(() => {
            const element = document.getElementById('training-bridge');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };



    const handleStartInterview = async () => {
        if (!aim.trim()) return;
        setLoading(true);
        setStage('FETCHING_QUESTIONS');
        setError(null);

        try {
            const res = await fetch('http://localhost:5000/career/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ aim }),
            });
            const data = await res.json();

            if (data.success && Array.isArray(data.questions)) {
                setQuestions(data.questions);
                setStage('INTERVIEW');
            } else {
                throw new Error(data.error || "Failed to generate questions");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to start interview. Please try again.");
            setStage('AIM');
        } finally {
            setLoading(false);
        }
    };

    const handleNextQuestion = () => {
        if (!currentAnswer.trim()) return;

        // Save answer
        setAnswers(prev => ({
            ...prev,
            [`question_${currentQIndex}`]: {
                question: questions[currentQIndex],
                answer: currentAnswer
            }
        }));

        setCurrentAnswer('');

        if (currentQIndex < questions.length - 1) {
            setCurrentQIndex(prev => prev + 1);
        } else {
            submitInterview();
        }
    };

    const submitInterview = async () => {
        setStage('ANALYZING');
        setLoading(true);

        try {
            // Construct payload for evaluation
            // We need to merge the last answer first because handleNextQuestion updates state asynchronously 
            // but submitInterview is called immediately. 
            // ACTUALLY: handleNextQuestion calls submitInterview in the 'else' block AFTER state update? 
            // No, setAnswers is async. Safe way: pass data to submit or simple useEffect.
            // Let's grab the latest answer explicitly.

            const finalAnswers = {
                ...answers,
                [`question_${currentQIndex}`]: {
                    question: questions[currentQIndex],
                    answer: currentAnswer
                }
            };

            const payload = {
                aim,
                answers: finalAnswers,
                userData: {
                    clerkUserId: profileData?.clerkUserId,
                    name: profileData?.fullName
                }
            };

            const res = await fetch('http://localhost:5000/career/evaluate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (data.report) {
                setReport(data.report);
                setStage('REPORT');
            } else {
                throw new Error("Failed to generate report");
            }
        } catch (err) {
            console.error(err);
            const errorMsg = "Analysis failed. Please try again.";
            setError(errorMsg);
            window.alert(errorMsg + "\n" + (err.message || "")); // Show simple alert as requested
            setStage('INTERVIEW'); // Go back to allow retry
        } finally {
            setLoading(false);
        }
    };


    // --- RENDERERS ---

    if (stage === 'AIM') {
        return (
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100 animate-fade-in text-center relative">
                <button onClick={onBack} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><XCircle /></button>

                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Bot className="w-8 h-8" />
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-2">AI Career Interview</h2>
                <p className="text-gray-500 mb-8">Tell me your target role, and I will generate a custom technical interview for you.</p>

                <div className="flex flex-col gap-4 text-left">
                    <label className="font-semibold text-gray-700 ml-1">What is your Target Role?</label>
                    <input
                        type="text"
                        value={aim}
                        onChange={e => setAim(e.target.value)}
                        placeholder="e.g. Senior React Developer, DevOps Engineer..."
                        className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all"
                        autoFocus
                    />
                    <button
                        onClick={handleStartInterview}
                        disabled={!aim.trim() || loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <>Start Interview <ArrowRight className="w-5 h-5" /></>}
                    </button>
                </div>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        );
    }

    if (stage === 'FETCHING_QUESTIONS' || stage === 'ANALYZING') {
        return (
            <div className="max-w-2xl mx-auto bg-white p-12 rounded-2xl shadow-xl border border-gray-100 text-center animate-fade-in">
                <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {stage === 'FETCHING_QUESTIONS' ? "Generating Interview Questions..." : "Analyzing Your Responses..."}
                </h2>
                <p className="text-gray-500">Using advanced AI to tailor the experience for <strong>{aim}</strong>.</p>
            </div>
        );
    }

    if (stage === 'INTERVIEW') {
        return (
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in flex flex-col min-h-[500px]">
                {/* Progress Bar */}
                <div className="bg-gray-100 h-2 w-full">
                    <div
                        className="bg-blue-600 h-full transition-all duration-500 ease-out"
                        style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
                    />
                </div>

                <div className="p-8 flex-1 flex flex-col">
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-blue-600 tracking-wider uppercase">
                                Question {currentQIndex + 1} of {questions.length}
                            </span>
                            {currentQIndex > 0 && (
                                <button
                                    onClick={() => {
                                        // Save current input before going back? Optional, mostly just nav back
                                        // But to preserve current answer if they typed:
                                        setAnswers(prev => ({
                                            ...prev,
                                            [`question_${currentQIndex}`]: { question: questions[currentQIndex], answer: currentAnswer }
                                        }));
                                        // Load previous answer
                                        const prevIndex = currentQIndex - 1;
                                        const prevAns = answers[`question_${prevIndex}`]?.answer || '';
                                        setCurrentAnswer(prevAns);
                                        setCurrentQIndex(prevIndex);
                                    }}
                                    className="text-sm text-gray-500 hover:text-gray-800 underline transition"
                                >
                                    Previous Question
                                </button>
                            )}
                        </div>

                        <h3 className="text-2xl font-bold text-gray-800 mt-2 leading-relaxed">
                            {questions[currentQIndex]}
                        </h3>
                    </div>

                    <textarea
                        value={currentAnswer}
                        onChange={e => setCurrentAnswer(e.target.value)}
                        placeholder="Type your answer here..."
                        className="w-full flex-1 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 resize-none text-lg transition-all mb-6 focus:shadow-md"
                        autoFocus
                    />

                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm hidden sm:block">Be specific for better accuracy.</span>
                        <button
                            onClick={handleNextQuestion}
                            disabled={!currentAnswer.trim()}
                            className="bg-black hover:bg-gray-800 text-white font-bold px-8 py-3 rounded-lg flex items-center gap-2 transition-all disabled:opacity-50 shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
                        >
                            {currentQIndex === questions.length - 1 ? "Submit Interview" : "Next Question"} <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (stage === 'REPORT' && report) {
        return (
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-4xl mx-auto overflow-hidden animate-fade-in">
                <div className="bg-green-600 p-6 text-white flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-2"><Sparkles /> Career Analysis Report</h2>
                        <p className="opacity-90">Based on your interview for {aim}</p>
                    </div>
                    <button
                        onClick={() => { onBack(); }}
                        className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition"
                    >
                        Close
                    </button>
                </div>

                <div className="p-8 space-y-8 overflow-y-auto max-h-[80vh]">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2"><CheckCircle className="text-green-500 w-5 h-5" /> Your Strengths</h4>
                            <div className="flex flex-wrap gap-2">
                                {report.skills_user_has.map((s, i) => (
                                    <span key={i} className="px-3 py-1 bg-green-100 text-green-700 border border-green-200 rounded-full text-sm font-medium">{s}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2"><XCircle className="text-red-500 w-5 h-5" /> Areas for Improvement</h4>
                            <div className="flex flex-wrap gap-2">
                                {report.skill_gaps.map((s, i) => (
                                    <span key={i} className="px-3 py-1 bg-red-50 text-red-700 border border-red-100 rounded-full text-sm font-medium">{s}</span>
                                ))}
                            </div>
                            {/* Real World Examples - New Section */}
                            {report.real_world_examples && report.real_world_examples.length > 0 && (
                                <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200">
                                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <Sparkles className="text-yellow-600 w-5 h-5" /> Real World Success Stories
                                    </h4>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {report.real_world_examples.map((ex, i) => (
                                            <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-yellow-100">
                                                <div className="font-bold text-gray-900">{ex.name}</div>
                                                <p className="text-sm text-gray-600 mt-1 italic">"{ex.how_they_succeeded}"</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Detailed Roadmap */}
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Action Plan</h3>
                        <div className="space-y-6">
                            {Object.entries(report.roadmap).map(([period, action], idx) => (
                                <div key={period} className="flex gap-4 items-start">
                                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900 uppercase text-xs tracking-wider mb-2">
                                            {period.replace(/_/g, ' ')}
                                        </div>
                                        <div className="text-gray-700 leading-relaxed text-sm">
                                            <ul className="space-y-2 list-none">
                                                {action.split('\n').map((line, i) => (
                                                    <li key={i} className="flex gap-2 items-start">
                                                        {['•', '-', '*'].some(char => line.trim().startsWith(char)) && (
                                                            <span className="text-blue-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
                                                        )}
                                                        <span>{line.replace(/^[•\-*]\s*/, '')}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


            </div>
        );
    }

    return null;
};

export default CareerInterview;
