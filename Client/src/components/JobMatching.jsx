import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Briefcase,
  MapPin,
  DollarSign,
  ExternalLink,
  Calendar,
  Loader2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// =============================
// CONFIGURATION
// =============================
const JOOBLE_API_KEY = "ed6fa15d-6d03-4eea-b8bb-79a949c4c611";
const JOOBLE_BASE_URL = "https://jooble.org/api/";
const JOOBLE_URL = `${JOOBLE_BASE_URL}${JOOBLE_API_KEY}`;

// =============================
// CALL JOOBLE API
// =============================
const fetchJoobleJobs = async (keywords, location) => {
  try {
    const response = await fetch(JOOBLE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        keywords,
        location,
        page: 1,
        searchMode: 1,
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ API Response:", data);
    return data.jobs || [];
  } catch (error) {
    console.error("❌ Jooble API Error:", error);
    throw error;
  }
};

const JobMatching = ({ t }) => {
  const [showJobs, setShowJobs] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedJobIndex, setExpandedJobIndex] = useState(null);
  const [desiredPosition, setDesiredPosition] = useState("Full Stack Web Development");
  const [userLocation, setUserLocation] = useState("India");

  // User Data from Redux
  const { profileData } = useSelector((state) => state.clerk);
  const { user } = useSelector((state) => state.auth);

  // Fetch desired position from database
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Get clerkUserId from auth state or profileData
        const clerkUserId = user?.id || profileData?.clerkUserId;

        if (!clerkUserId) {
          console.log("⚠️ No clerkUserId found, using defaults");
          return;
        }

        console.log("🔄 Fetching user profile from database...");
        const response = await fetch(`http://localhost:5000/api/profile/${clerkUserId}`);

        if (response.ok) {
          const data = await response.json();
          console.log("✅ Profile fetched:", data);

          if (data.profile?.desiredPosition) {
            setDesiredPosition(data.profile.desiredPosition);
            console.log("📍 Desired Position set to:", data.profile.desiredPosition);
          }

          if (data.profile?.location) {
            setUserLocation(data.profile.location);
            console.log("🌍 Location set to:", data.profile.location);
          }
        } else {
          console.log("⚠️ Profile not found in database, using defaults");
        }
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
        // Continue with defaults if fetch fails
      }
    };

    fetchUserProfile();
  }, [user, profileData]);

  // Also check Redux state as fallback
  useEffect(() => {
    if (profileData?.desiredPosition) {
      setDesiredPosition(profileData.desiredPosition.trim());
    }
    if (profileData?.location) {
      setUserLocation(profileData.location.trim());
    }
  }, [profileData]);

  console.log("🔍 Desired Position:", desiredPosition);
  console.log("📍 User Location:", userLocation);

  // FORMAT DATE
  const formatDate = (dateString) => {
    if (!dateString) return "Recently";

    const date = new Date(dateString);
    const now = new Date();
    const diff = (now - date) / (1000 * 60 * 60 * 24);

    if (diff < 1) return "Today";
    if (diff < 2) return "Yesterday";
    if (diff < 7) return `${Math.floor(diff)} days ago`;
    if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`;
    return `${Math.floor(diff / 30)} months ago`;
  };

  // Toggle job details
  const toggleJobDetails = (index) => {
    setExpandedJobIndex(expandedJobIndex === index ? null : index);
  };

  // FIND JOBS
  const handleFindJobs = async () => {
    console.log("🖱 Find Jobs Clicked!");

    if (!desiredPosition) {
      setError("Please set your desired job position in your profile.");
      setShowJobs(true);
      return;
    }

    setLoading(true);
    setError(null);
    setShowJobs(true);
    setExpandedJobIndex(null);

    try {
      console.log("📡 Fetching jobs from Jooble...");
      const jobListings = await fetchJoobleJobs(desiredPosition, userLocation);
      console.log("🎯 Jooble Results:", jobListings);

      if (jobListings.length > 0) {
        setJobs(jobListings);
        setError(null);
      } else {
        setJobs([]);
        setError("No jobs found. Try different keywords or location.");
      }
    } catch (err) {
      console.error("❌ Error fetching jobs:", err);
      setJobs([]);
      setError("Failed to fetch jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-[1200px] mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-dark">
            {t?.title || "💼 Find Jobs"}
          </h2>
          <p className="text-lg text-gray-500 max-w-[600px] mx-auto">
            {t?.description || "Discover job opportunities tailored to your skills"}
          </p>
        </div>

        {/* MAIN BOX */}
        <div className="bg-gray-50 rounded-lg p-8 shadow-sm">

          {/* FIRST SCREEN */}
          {!showJobs ? (
            <div className="text-center">
              <button
                onClick={handleFindJobs}
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-md font-semibold
              cursor-pointer transition-all duration-300 inline-flex items-center gap-2"
              >
                <Briefcase className="w-5 h-5" />
                {t?.findJobsBtn || "Find Jobs"}
              </button>

              {!desiredPosition && (
                <p className="text-sm text-gray-500 mt-3">
                  Set your desired position in your profile to get started.
                </p>
              )}
            </div>
          ) : (
            <div>

              {/* LOADING */}
              {loading && (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-3" />
                  <p className="text-gray-600">Searching for jobs...</p>
                </div>
              )}

              {/* ERROR */}
              {error && !loading && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 mb-6">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              {/* RESULTS */}
              {!loading && jobs.length > 0 && (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">
                      {jobs.length} Jobs Found for "{desiredPosition}"
                    </h3>
                    <button
                      onClick={() => setShowJobs(false)}
                      className="text-gray-600 hover:text-blue-600 transition"
                    >
                      ← Back
                    </button>
                  </div>

                  {/* JOB LIST */}
                  <div className="bg-white rounded-lg border max-h-[500px] overflow-y-auto">
                    {jobs.map((job, index) => (
                      <div key={index} className="border-b last:border-b-0">

                        {/* Job Header */}
                        <div
                          onClick={() => toggleJobDetails(index)}
                          className="p-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                        >
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">
                              {job.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {job.company} • {job.location}
                            </p>
                          </div>
                          {expandedJobIndex === index ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </div>

                        {/* Expanded Details */}
                        {expandedJobIndex === index && (
                          <div className="px-4 pb-4 bg-gray-50 border-t">
                            <p className="text-sm mt-3 text-gray-600 leading-relaxed">
                              {job.description}
                            </p>

                            <a
                              href={job.link || job.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 
                              text-white px-5 py-2 rounded-md text-sm font-semibold"
                            >
                              Apply Now <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        )}

                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Tap on any job to view details.
                  </p>
                </>
              )}

              {/* NO JOBS FOUND */}
              {!loading && jobs.length === 0 && !error && (
                <div className="text-center py-12">
                  <Briefcase className="w-12 h-12 text-gray-400 mx-auto" />
                  <h3 className="text-lg mt-3 font-semibold">No Jobs Found</h3>
                  <button
                    onClick={() => setShowJobs(false)}
                    className="text-blue-600 hover:underline mt-3"
                  >
                    ← Back
                  </button>
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobMatching;
