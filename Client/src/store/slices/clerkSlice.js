import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clerkUser: null,
  profileCompleted: false,
  profileData: {
    fullName: '',
    email: '',
    profileImage: '',
    phoneNumber: '',
    location: '',
    desiredPosition: '',
    skills: [],
    education: '',
    bio: ''
  }
};

const clerkSlice = createSlice({
  name: 'clerk',
  initialState,
  reducers: {
    setClerkUser: (state, action) => {
      state.clerkUser = action.payload;
      // Auto-fill basic data from Clerk
      state.profileData.fullName = action.payload.fullName || '';
      state.profileData.email = action.payload.primaryEmailAddress?.emailAddress || '';
      state.profileData.profileImage = action.payload.imageUrl || '';
    },
    updateProfileData: (state, action) => {
      state.profileData = { ...state.profileData, ...action.payload };
    },
    setProfileCompleted: (state, action) => {
      state.profileCompleted = action.payload;
    },
    clearClerkUser: (state) => {
      state.clerkUser = null;
      state.profileCompleted = false;
      state.profileData = initialState.profileData;
    }
  }
});

export const { 
  setClerkUser, 
  updateProfileData, 
  setProfileCompleted, 
  clearClerkUser 
} = clerkSlice.actions;

export default clerkSlice.reducer;
