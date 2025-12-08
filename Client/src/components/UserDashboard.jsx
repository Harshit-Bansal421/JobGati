import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    User,
    Phone,
    MapPin,
    GraduationCap,
    Building2,
    FileText,
    Save,
    X,
    CheckCircle2,
    Briefcase
} from 'lucide-react';
import { updateProfileData, setProfileCompleted } from '../store/slices/clerkSlice';
import { saveUserProfile, getUserProfile } from '../services/userProfileService';

const UserDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { clerkUser, profileData } = useSelector((state) => state.clerk);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        profileImage: '',
        phoneNumber: '',
        location: '',
        desiredPosition: '',
        skills: [],
        education: '',
        bio: ''
    });

    const [skillInput, setSkillInput] = useState('');
    const [isDetectingLocation, setIsDetectingLocation] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    useEffect(() => {
        if (profileData) {
            setFormData(profileData);
        }
    }, [profileData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddSkill = (e) => {
        if (e.key === 'Enter' && skillInput.trim()) {
            e.preventDefault();
            if (!formData.skills.includes(skillInput.trim())) {
                setFormData(prev => ({
                    ...prev,
                    skills: [...prev.skills, skillInput.trim()]
                }));
            }
            setSkillInput('');
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove)
        }));
    };

    const handleDetectLocation = () => {
        setIsDetectingLocation(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
                        );
                        const data = await response.json();
                        const location = data.address.city || data.address.town || data.address.village || data.display_name;
                        setFormData(prev => ({
                            ...prev,
                            location: location
                        }));
                    } catch (error) {
                        console.error('Error getting location name:', error);
                        alert('Could not detect location. Please enter manually.');
                    } finally {
                        setIsDetectingLocation(false);
                    }
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    alert('Location access denied. Please enter manually.');
                    setIsDetectingLocation(false);
                }
            );
        } else {
            alert('Geolocation is not supported by your browser');
            setIsDetectingLocation(false);
        }
    };

    // Load profile from database on mount
    useEffect(() => {
        const loadProfile = async () => {
            if (clerkUser?.id) {
                try {
                    const profile = await getUserProfile(clerkUser.id);
                    if (profile) {
                        dispatch(updateProfileData({
                            fullName: profile.fullName,
                            email: profile.email,
                            phoneNumber: profile.phoneNumber,
                            location: profile.location,
                            desiredPosition: profile.desiredPosition,
                            skills: profile.skills || [],
                            education: profile.education,
                            bio: profile.bio,
                        }));
                    }
                } catch (error) {
                    console.error('Error loading profile:', error);
                }
            }
        };
        loadProfile();
    }, [clerkUser, dispatch]);

    const handleSaveProfile = async () => {
        try {
            // Save to database
            await saveUserProfile({
                clerkUserId: clerkUser.id,
                ...formData,
                profileCompleted: !isProfileIncomplete
            });

            // Update Redux
            dispatch(updateProfileData(formData));
            dispatch(setProfileCompleted(true));

            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Failed to save profile. Please try again.');
        }
    };

    const isProfileIncomplete = !formData.phoneNumber || !formData.location || !formData.desiredPosition || formData.skills.length === 0;

    if (!clerkUser) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Not Authenticated</h2>
                    <p className="text-gray-600">Please sign in to access your dashboard</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back, {clerkUser?.firstName || 'User'}! 👋
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Complete your profile to unlock all features of JobGati
                    </p>
                </div>

                {saveSuccess && (
                    <div className="fixed top-24 right-6 bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 shadow-xl z-50 flex items-center gap-3 animate-fade-in-down">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <p className="font-medium">Profile saved successfully!</p>
                    </div>
                )}

                {isProfileIncomplete && (
                    <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-blue-800 font-medium">
                            ⚠️ Your profile is incomplete. Please fill in the required fields below.
                        </p>
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-32"></div>
                    <div className="px-6 pb-6">
                        <div className="flex items-center gap-6 -mt-16">
                            <div className="relative">
                                <img
                                    src={formData.profileImage || 'https://via.placeholder.com/120'}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                                />
                            </div>

                            <div className="mt-16">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {formData.fullName || 'John Doe'}
                                </h2>
                                <p className="text-gray-600 flex items-center gap-2 mt-1">
                                    <User className="w-4 h-4" />
                                    {formData.email || 'email@example.com'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <FileText className="w-6 h-6 text-blue-600" />
                        Complete Your Profile
                    </h3>

                    <div className="space-y-6">
                        {/* Phone Number */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <Phone className="w-4 h-4 text-blue-600" />
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                placeholder="+91 98765 43210"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-blue-600" />
                                Location *
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Mumbai, Maharashtra"
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                />
                                <button
                                    type="button"
                                    onClick={handleDetectLocation}
                                    disabled={isDetectingLocation}
                                    className="px-4 py-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition flex items-center gap-2 disabled:opacity-50"
                                >
                                    <MapPin className="w-4 h-4" />
                                    {isDetectingLocation ? 'Detecting...' : 'Detect'}
                                </button>
                            </div>
                        </div>

                        {/* Desired Position */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-blue-600" />
                                Desired Job Position *
                            </label>
                            <input
                                type="text"
                                name="desiredPosition"
                                value={formData.desiredPosition}
                                onChange={handleInputChange}
                                placeholder="e.g., Software Developer, Plumber, Sales Manager"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            />
                        </div>

                        {/* Skills */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-blue-600" />
                                Skills * <span className="text-xs text-gray-500 font-normal">(Press Enter to add)</span>
                            </label>
                            <input
                                type="text"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyDown={handleAddSkill}
                                placeholder="e.g., React, Plumbing, Carpentry"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            />

                            {formData.skills.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {formData.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium"
                                        >
                                            {skill}
                                            <button
                                                onClick={() => handleRemoveSkill(skill)}
                                                className="hover:bg-blue-200 rounded-full p-0.5 transition"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Education */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <GraduationCap className="w-4 h-4 text-blue-600" />
                                Education Level
                            </label>
                            <select
                                name="education"
                                value={formData.education}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                            >
                                <option value="">Select your education level</option>
                                <option value="10th">10th Pass</option>
                                <option value="12th">12th Pass</option>
                                <option value="diploma">Diploma</option>
                                <option value="graduate">Graduate</option>
                                <option value="postgraduate">Post Graduate</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-blue-600" />
                                About You
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                placeholder="Tell us a bit about yourself and your experience..."
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                            />
                        </div>

                        {/* Save Button */}
                        <div className="pt-4 space-y-3">
                            <button
                                onClick={handleSaveProfile}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                            >
                                <Save className="w-5 h-5" />
                                Save Profile
                            </button>

                            {/* Analyze Skills Button */}
                            {!isProfileIncomplete && (
                                <button
                                    onClick={() => navigate('/skill-analysis')}
                                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                >
                                    <Briefcase className="w-5 h-5" />
                                    Analyze My Skills with AI
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Profile Completion Status */}
                <div className="mt-6 bg-white rounded-xl shadow-md p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Profile Completion Status</h4>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className={`w-5 h-5 ${formData.phoneNumber ? 'text-green-600' : 'text-gray-300'}`} />
                            <span className={formData.phoneNumber ? 'text-gray-900' : 'text-gray-500'}>Phone Number</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className={`w-5 h-5 ${formData.location ? 'text-green-600' : 'text-gray-300'}`} />
                            <span className={formData.location ? 'text-gray-900' : 'text-gray-500'}>Location</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className={`w-5 h-5 ${formData.desiredPosition ? 'text-green-600' : 'text-gray-300'}`} />
                            <span className={formData.desiredPosition ? 'text-gray-900' : 'text-gray-500'}>Desired Position</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className={`w-5 h-5 ${formData.skills.length > 0 ? 'text-green-600' : 'text-gray-300'}`} />
                            <span className={formData.skills.length > 0 ? 'text-gray-900' : 'text-gray-500'}>Skills</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className={`w-5 h-5 ${formData.education ? 'text-green-600' : 'text-gray-300'}`} />
                            <span className={formData.education ? 'text-gray-900' : 'text-gray-500'}>Education</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;