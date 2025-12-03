import React, { useState } from 'react';

const JobMatching = ({ t, userSkills }) => {
  const [jobsResult, setJobsResult] = useState(null);

  const handleFindJobs = async () => {
    // Simulate API call
    setTimeout(() => {
        setJobsResult({
            jobs: [
                {
                    match: 95,
                    title: "Senior Welder",
                    company: "BuildRight Construction",
                    location: "New Delhi",
                    skills: ["Welding L3", "Safety L2"]
                },
                {
                    match: 80,
                    title: "Solar Technician Assistant",
                    company: "Green Energy Sol",
                    location: "Noida",
                    skills: ["Solar Installation L1", "Electrical Basics"]
                }
            ]
        });
    }, 1000);
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-[1000px] mx-auto px-5">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-dark">{t.title}</h2>
          <p className="text-lg text-gray-500 max-w-[600px] mx-auto">{t.description}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
          <button className="bg-primary text-white hover:bg-blue-600 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300" onClick={handleFindJobs}>
            {t.findJobsBtn}
          </button>

          {jobsResult && (
            <div className="bg-white rounded-lg p-5 mt-5 shadow-sm">
              <h3 className="text-xl mb-4 text-dark font-bold">{t.resultTitle}</h3>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 mt-5">
                {jobsResult.jobs.map((job, index) => (
                  <div key={index} className="bg-white rounded-lg p-5 shadow-md border-l-4 border-primary">
                    <div className="text-2xl font-bold text-primary mb-2.5">{job.match}%</div>
                    <h4 className="text-lg mb-2.5 text-dark font-bold">{job.title}</h4>
                    <p className="text-sm text-gray-500 mb-4">
                      <strong>Company:</strong> {job.company}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      <strong>Location:</strong> {job.location}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      <strong>Required Skills:</strong>{" "}
                      {job.skills.join(", ")}
                    </p>
                    <button
                      className="bg-primary text-white hover:bg-blue-600 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300 mt-2.5"
                    >
                      Apply Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobMatching;
