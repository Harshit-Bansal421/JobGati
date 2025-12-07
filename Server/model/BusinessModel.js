import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
  {
    businessName: String,
    username: String,
    email: String,
    password: String,
    industry: String,
    location: String,
    contact: String, // Changed from contactPerson (Number) to contact (String)
    about: String, // Added about field
    jobPositions: {
      type: [String],
      default: [],
    },
    ExpectedSalary: Number,
    requiredSkills: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Important → use "Business" NOT "Businesses"
export default mongoose.models.Business || mongoose.model("Business", businessSchema);
