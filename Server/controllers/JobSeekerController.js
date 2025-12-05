import JobSeekerModel from "../model/jobSeekerModel.js";

// Create Job Seeker (Signup)
export const createJobSeeker = async (req, res) => {
  try {
    const { name, age, Highest_Education_Level, skills } = req.body;

    const jobSeeker = await JobSeekerModel.create({
      name,
      age,
      Highest_Education_Level,
      skills,
    });

    res.status(201).json({
      success: true,
      message: "Job Seeker created successfully",
      data: jobSeeker,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all Job Seekers
export const getAllJobSeekers = async (req, res) => {
  try {
    const jobSeekers = await JobSeekerModel.find();

    res.status(200).json({
      success: true,
      data: jobSeekers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Job Seeker
export const updateJobSeeker = async (req, res) => {
  try {
    const updated = await JobSeekerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated data
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Job Seeker not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job Seeker updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Job Seeker
export const deleteJobSeeker = async (req, res) => {
  try {
    const deleted = await JobSeekerModel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Job Seeker not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job Seeker deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
