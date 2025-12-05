
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    business_name: {
      type: String,
      
    },
    industry: {
      type: String,
      
    },
    location: {
      type: String,

    },
    contact_person: {
      type: Number,
    },
    job_positions: {
      type: [String], // Array of positions
      default: [],
    },
    required_Skills: {
      type: [String], 
      default: [],
    },

  },
  { timestamps: true }
);

const BusinessModel = mongoose.models.Businesses || mongoose.model("Businesses", userSchema)
export default BusinessModel;