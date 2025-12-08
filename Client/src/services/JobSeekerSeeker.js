const API_URL = "https://jobgati-1.onrender.com/api/jobseekers";

export const createJobSeeker = async (jobSeekerData) => {
  const res = await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobSeekerData),
  });
  alert("Job Seeker created successfully");
  return res.json();
};
