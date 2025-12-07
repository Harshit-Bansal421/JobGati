const API_URL = "http://localhost:5000/api/business";

export const createBusiness = async (businessData) => {
  try {
    const res = await fetch(`${API_URL}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(businessData),
    });
    console.log("Request payload:", businessData);
    console.log("Response status:", res.status);

    const data = await res.json(); // CALL ONLY ONCE

    if (!res.ok) {
      console.error("Backend Error:", data);
      alert("Failed to create business");
      return null;
    }

    alert("Business created successfully");
    return data;

  } catch (err) {               `1`
    console.error("Network error:", err);
    alert("Network error: Could not reach server");
    return null;
  }
};


export const updateBusiness = async (businessData) => {
  try {
    const res = await fetch(`${API_URL}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(businessData),
    });
    
    const data = await res.json();
    
    if (!res.ok) {
        console.error("Update failed:", data);
        alert("Failed to update profile");
        return null;
    }
    
    return data;
  } catch (err) {
    console.error("Network error:", err);
    return null;
  }
};

export const postJob = async (jobData) => {
  try {
    const res = await fetch(`${API_URL}/post-job`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
    });
    
    const data = await res.json();
   
    if(!res.ok) {
        console.error("Post job failed:", data);
        alert("Failed to post job");
        return null;
    }
    
    return data;
  } catch (err) {
    console.error("Network error:", err);
    return null;
  }
};

export const updateJob = async (jobData) => {
  try {
    const res = await fetch(`${API_URL}/job/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
    });
    
    const data = await res.json();
   
    if(!res.ok) {
        console.error("Update job failed:", data);
        alert("Failed to update job");
        return null;
    }
    
    return data;
  } catch (err) {
    console.error("Network error:", err);
    return null;
  }
};

export const deleteJob = async (jobId) => {
  try {
    const res = await fetch(`${API_URL}/job/${jobId}`, {
        method: "DELETE",
    });
    
    const data = await res.json();
   
    if(!res.ok) {
        console.error("Delete job failed:", data);
        alert("Failed to delete job");
        return null;
    }
    
    return data;
  } catch (err) {
    console.error("Network error:", err);
    return null;
  }
};

export const toggleJobStatus = async (jobId) => {
  try {
    const res = await fetch(`${API_URL}/job/toggle-status/${jobId}`, {
        method: "PATCH",
    });
    
    const data = await res.json();
   
    if(!res.ok) {
        console.error("Toggle status failed:", data);
        alert("Failed to update job status");
        return null;
    }
    
    return data;
  } catch (err) {
    console.error("Network error:", err);
    return null;
  }
};
