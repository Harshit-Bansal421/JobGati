import mongoose from 'mongoose';

const skillAnalysisSchema = new mongoose.Schema({
  clerkUserId: {
    type: String,
    required: true,
    index: true
  },
  userProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfile'
  },
  analysisDate: {
    type: Date,
    default: Date.now
  },
  jobRole: {
    type: String,
    required: true
  },
  userSkills: [{
    type: String
  }],
  matchScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  missingSkills: [{
    type: String
  }],
  radarChartData: {
    Technical: {
      type: Number,
      min: 0,
      max: 10
    },
    Practical: {
      type: Number,
      min: 0,
      max: 10
    },
    SoftSkills: {
      type: Number,
      min: 0,
      max: 10
    },
    Tools: {
      type: Number,
      min: 0,
      max: 10
    }
  },
  oneLineAdvice: {
    type: String
  }
}, {
  timestamps: true
});

const SkillAnalysis = mongoose.model('SkillAnalysis', skillAnalysisSchema);

export default SkillAnalysis;
