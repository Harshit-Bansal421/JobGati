import mongoose from "mongoose";

const DashboardSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String, 
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    desiredPosition: {
      type: String,
      required: true,
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    educationLevel: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      default: "",
    },
    resume: {
      type: String, // File URL
    },
    desiredPosition: {
      type: String,
      required: true,
      trim: true,
    },

    about: {
      type: String,
      default: "",
      trim: true,
    },
    certificates: {
      type: [String], // File URLs
      default: [],
    },

    experience: [
      {
        role: String,
        company: String,
        duration: String,
      }
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Dashboard || mongoose.model("Dashboard", DashboardSchema);
