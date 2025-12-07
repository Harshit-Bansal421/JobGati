import { data } from "autoprefixer";

const API_URL = "http://localhost:5000/api/jobseeker";

// Create Job Seeker
export const createJobSeeker = async (jobSeekerData) => {
  try {
    const response = await fetch(`${API_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobSeekerData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating job seeker:", error);
    return { success: false, message: error.message };
  }
};

// Get All Job Seekers
export const getAllJobSeekers = async () => {
  try {
    const response = await fetch(`${API_URL}/all`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching job seekers:", error);
    return null;
  }
};

// Update Job Seeker
export const updateJobSeeker = async (id, updatedData) => {
  try {
    const response = await fetch(`${API_URL}/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating job seeker:", error);
    return { success: false, message: error.message };
  }
};

// Delete Job Seeker
export const deleteJobSeeker = async (id) => {
  try {
    const response = await fetch(`${API_URL}/delete/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting job seeker:", error);
    return { success: false, message: error.message };
  }
};

// Get Single Job Seeker Profile
export const getJobSeekerProfile = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    
    if (data.success) {
        return data.data;
    } else {
        return null;
    }
  } catch (error) {
    console.error("Error fetching job seeker profile:", error);
    return null;
  }
};
