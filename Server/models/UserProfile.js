import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  clerkUserId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  desiredPosition: {
    type: String,
    required: true
  },
  skills: [{
    type: String
  }],
  education: {
    type: String
  },
  bio: {
    type: String
  },
  profileImage: {
    type: String
  },
  profileCompleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

export default UserProfile;
