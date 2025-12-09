import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Briefcase, MapPin, DollarSign, ExternalLink, Calendar, Building2, Loader2, AlertCircle } from 'lucide-react';
import { fetchJoobleJobs } from '../services/joobleService';

const JobMatching = ({ t }) => {
  const [showJobs, setShowJobs] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedJobIndex, setExpandedJobIndex] = useState(null);

  // User Data from Redux
  const { profileData } = useSelector((state) => state.clerk);

  // For testing: Use "Full Stack Web Development" as default if no desired position is set
  const desiredPosition = profileData?.desiredPosition?.trim() || "Full Stack Web Development";
  const userLocation = profileData?.location?.trim() || "India";

  const handleFindJobs = async () => {
    console.log("🖱️ Find Jobs Clicked!");

    if (!desiredPosition) {
      setError('Please set your desired position in your profile first!');
      return;
    }

    setLoading(true);
    setError(null);
    setShowJobs(true);
    setExpandedJobIndex(null);

    try {
      const jobListings = await fetchJoobleJobs(desiredPosition, userLocation, 1);
      setJobs(jobListings);
      if (jobListings.length === 0) {
        setError('No jobs found for your search criteria. Try a different position or location.');
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to fetch jobs. Please try again later.');
      setJobs([]);
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
                  <div className="flex-1">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                </div>
              )}

              {/* Jobs List */}
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

                  {/* Vertical Job Cards */}
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {jobs.map((job, index) => (
                      <div
                        key={job.id || index}
                        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-5 border border-gray-200"
                      >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          {/* Job Info */}
                          <div className="flex-1">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                                <Building2 className="w-4 h-4 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-lg font-bold text-gray-900 mb-1 hover:text-blue-600 transition">
                                  {job.title}
                                </h4>
                                <p className="text-gray-600 font-medium text-sm">
                                  {job.company}
                                </p>
                              </div>
                            </div>

                            {/* Job Details */}
                            <div className="flex flex-wrap gap-4 mb-3 text-sm">
                              <div className="flex items-center gap-1 text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span>{job.location}</span>
                              </div>
                              {job.salary && job.salary !== 'Salary not specified' && (
                                <div className="flex items-center gap-1 text-gray-600">
                                  <DollarSign className="w-4 h-4" />
                                  <span>{job.salary}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1 text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(job.updated)}</span>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                              {job.description}
                            </p>

                            {/* Type Badge */}
                            {job.type && (
                              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                                {job.type}
                              </span>
                            )}
                          </div>

                          {/* Apply Button */}
                          <div className="flex-shrink-0">
                            <a
                              href={job.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md font-semibold transition-all text-sm"
                            >
                              Apply Now
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Back Button at Bottom */}
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setShowJobs(false)}
                      className="text-gray-600 hover:text-blue-600 font-medium transition"
                    >
                      ← Back
                    </button>
                  </div>
                </div>
              )}

              {/* NO JOBS FOUND */}
              {!loading && jobs.length === 0 && !error && (
                <div className="text-center py-12">
                  <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Jobs Found
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Try adjusting your search criteria or check back later.
                  </p>
                  <button
                    onClick={() => setShowJobs(false)}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
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
