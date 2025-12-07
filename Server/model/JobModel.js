import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String, // Storing as string for now to match dashboard format "Oct 20, 2024", or use Date and format on frontend
      default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    },
    status: {
      type: String,
      enum: ["Active", "Closed"],
      default: "Active",
    },
    applicants: {
      type: Number, // Simplification for now as per dashboard data
      default: 0,
    },
    jobCategory: String,
    jobType: String,
    salary: Number,
    payFreq: String, // Monthly, Weekly, etc.
    vacancies: Number,
    skills: {
        type: String, // Comma separated string as per frontend
    },
    experience: String,
    education: String,
    overtime: Boolean,
    accommodation: String,
    food: String,
    location: String,
    shift: String,
    description: String,
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model("Job", jobSchema);
