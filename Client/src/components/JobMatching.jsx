import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Briefcase,
  MapPin,
  DollarSign,
  ExternalLink,
  Calendar,
  Loader2,
  AlertCircle,
} from "lucide-react";
let data;

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

    const data1 = await response.json();
    data= data1.jobs || [];
  } catch (error) {
    console.error("Jooble API Error:", error);
    return [];
  }
};

const JobMatching = ({ t }) => {
  const [showJobs, setShowJobs] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // User Data from Redux
  const { profileData } = useSelector((state) => state.clerk);

  const desiredPosition = profileData?.desiredPosition?.trim() || "";
  const userLocation = profileData?.location?.trim() || "India";

  console.log("🔍 Desired Position:", desiredPosition);
  console.log("📍 User Location:", userLocation);

  // ---------- FORMAT DATE ----------
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = (now - date) / (1000 * 60 * 60 * 24);

    if (diff < 1) return "Today";
    if (diff < 2) return "Yesterday";
    if (diff < 7) return `${Math.floor(diff)} days ago`;
    if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`;
    return `${Math.floor(diff / 30)} months ago`;
  };

  // ==================================================
  //            🔥 FIND JOBS HANDLER
  // ==================================================
  const handleFindJobs = async () => {
    console.log("🖱️ Find Jobs Clicked!");

    if (!desiredPosition) {
      setError("Please set your desired job position in your profile.");
      return;
    }

    setLoading(true);
    setError(null);
    setShowJobs(true);

    try {
      console.log("📡 Fetching jobs from Jooble...");
      const jobListings = await fetchJoobleJobs(desiredPosition, userLocation);

      console.log("🎯 Jooble Results:", jobListings);

      setJobs(jobListings);

      if (jobListings.length === 0) {
        setError("No jobs found. Try different keywords or location.");
      }
    } catch (err) {
      console.error("❌ Error fetching jobs:", err);
      setError("Failed to fetch jobs.");
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

              {/* JOB LISTS */}
              {!loading && jobs.length > 0 && (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      {jobs.length} Jobs Found for "{desiredPosition}"
                    </h3>
                    <button
                      onClick={() => setShowJobs(false)}
                      className="text-gray-600 hover:text-blue-600 font-medium transition"
                    >
                      ← Back
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {jobs.map((job, index) => (
                      <div
                        key={index}
                        className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md border border-gray-200 transition-all"
                      >
                        <h4 className="text-lg font-bold">{job.title}</h4>
                        <p className="text-gray-600">{job.company}</p>

                        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mt-2">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>

                          {job.salary && (
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {job.salary}
                            </span>
                          )}

                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(job.updated)}
                          </span>
                        </div>

                        <p className="text-gray-600 text-sm mt-3 line-clamp-2">
                          {job.description}
                        </p>

                        <a
                          href={job.link || job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md font-semibold text-sm"
                        >
                          Apply Now <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* NO JOBS FOUND */}
              {!loading && jobs.length === 0 && !error && (
                <div className="text-center py-12">
                  <Briefcase className="w-12 h-12 text-gray-400 mx-auto" />
                  <h3 className="text-lg font-semibold mt-2">No Jobs Found</h3>

                  <button
                    onClick={() => setShowJobs(false)}
                    className="text-blue-600 hover:text-blue-700 mt-3 font-medium"
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