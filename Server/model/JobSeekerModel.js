import mongoose from "mongoose";

const jobSeekerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },

    phone: {
      type: String,      // Store as string → aage leading 0 remove na ho
      // required: true,
    },

    age: {
      type: Number,
      // required: true,
    },

    education: {
      type: String,
      // required: true,
    },

    location: {
      type: String,
      // required: true,
    },

    aadhar: {
      type: String,      // Store as string (to avoid number size issues)
      required: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    experience: [
  {
    role: String,
    company: String,
    duration: String
  }
]
,
    resume: {
      type: String,       // File URL or Base64 string
    },

    certificates: {
      type: [String],     // URLs or filenames
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.JobSeeker || mongoose.model("JobSeeker", jobSeekerSchema);
