import JobModel from "../model/JobModel.js";

// Create a new job
export const createJob = async (req, res) => {
  try {
    const job = new JobModel(req.body);
    const savedJob = await job.save();
    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      data: savedJob,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get jobs by Business ID
export const getJobsByBusiness = async (req, res) => {
  try {
    const jobs = await JobModel.find({ businessId: req.params.businessId }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a job
export const updateJob = async (req, res) => {
  try {
    const updatedJob = await JobModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a job
export const deleteJob = async (req, res) => {
  try {
    const job = await JobModel.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Toggle Job Status
export const toggleJobStatus = async (req, res) => {
    try {
        const job = await JobModel.findById(req.params.id);
        if(!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }
        
        job.status = job.status === "Active" ? "Closed" : "Active";
        await job.save();
        
        res.status(200).json({
            success: true,
            data: job
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
