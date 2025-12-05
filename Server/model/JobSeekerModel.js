
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // phone: {
    //   type: String,
    // },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    Highest_Education_Level: {
      type: String,
      required: true,
    },  
    skills: {
      type: [String], // Array of skills
      default: [],
    },
  },
  { timestamps: true }
);

const JobSeekerModel = mongoose.models.JobSeekers || mongoose.model("JobSeekers", userSchema)
export default JobSeekerModel;