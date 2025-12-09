const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`;

export const createBusiness = async (businessData) => {
  try {
    const res = await fetch(`${API_URL}/business/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(businessData),
    });
    
    const data = await res.json();
    if (!res.ok) {
      console.error("Backend Error:", data);
      throw new Error(data.message || "Failed to create business");
    }
    return data;
  } catch (err) {
    console.error("Network error:", err);
    if (err.message.includes("Failed to fetch")) {
      throw new Error("Cannot connect to server. Please check your internet connection or try again later.");
    }
    throw err;
  }
};

export const getBusinessProfile = async (id) => {
    try {
        const res = await fetch(`${API_URL}/business/${id}`);
        const data = await res.json();
        if(!res.ok) return null;
        return data.data;
    } catch(err) {
         console.error(err);
         return null;
    }
}

export const updateBusiness = async (id, businessData) => {
  try {
    const res = await fetch(`${API_URL}/business/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(businessData),
    });
    const data = await res.json();
    if (!res.ok) {
        console.error("Update failed:", data);
        return null;
    }
    return data.data;
  } catch (err) {
    console.error("Network error:", err);
    return null;
  }
};

// --- JOB SERVICES ---

export const getBusinessJobs = async (businessId) => {
    try {
        const res = await fetch(`${API_URL}/jobs/business/${businessId}`);
        const data = await res.json();
        if(!res.ok) return [];
        return data.data;
    } catch(err) {
        console.error(err);
        return [];
    }
}

export const postJob = async (jobData) => {
  try {
    const res = await fetch(`${API_URL}/jobs/create`, {
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
    return data.data;
  } catch (err) {
    console.error("Network error:", err);
    return null;
  }
};

export const updateJob = async (id, jobData) => {
  try {
    const res = await fetch(`${API_URL}/jobs/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
    });
    const data = await res.json();
    if(!res.ok) {
        console.error("Update job failed:", data);
        return null;
    }
    return data.data;
  } catch (err) {
    console.error("Network error:", err);
    return null;
  }
};

export const deleteJob = async (jobId) => {
  try {
    const res = await fetch(`${API_URL}/jobs/delete/${jobId}`, {
        method: "DELETE",
    });
    const data = await res.json();
    if(!res.ok) {
        console.error("Delete job failed:", data);
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
    const res = await fetch(`${API_URL}/jobs/toggle-status/${jobId}`, {
        method: "PATCH",
    });
    const data = await res.json();
    if(!res.ok) {
        console.error("Toggle status failed:", data);
        return null;
    }
    return data.data;
  } catch (err) {
    console.error("Network error:", err);
    return null;
  }
};
