import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
  {
    businessName: String,
    industry: String,
    location: String,
    contactPerson: Number,
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
