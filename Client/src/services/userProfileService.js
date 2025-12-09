const API_URL = 'http://localhost:5000';

// Save user profile to database
export const saveUserProfile = async (profileData) => {
  try {
    console.log('💾 Saving profile to database:', profileData);
    
    const response = await fetch(`${API_URL}/api/profile/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to save profile');
    }

    const data = await response.json();
    console.log('✅ Profile saved successfully:', data);
    return data;
  } catch (error) {
    console.error('❌ Error saving profile:', error);
    throw error;
  }
};

// Get user profile from database
export const getUserProfile = async (clerkUserId) => {
  try {
    console.log('🔍 Fetching profile for user:', clerkUserId);
    
    const response = await fetch(`${API_URL}/api/profile/${clerkUserId}`);

    if (response.status === 404) {
      console.log('ℹ️ No profile found for user');
      return null;
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch profile');
    }

    const data = await response.json();
    console.log('✅ Profile fetched successfully');
    return data.profile;
  } catch (error) {
    console.error('❌ Error fetching profile:', error);
    throw error;
  }
};

// Get skill analysis history
export const getSkillAnalysisHistory = async (clerkUserId) => {
  try {
    console.log('📜 Fetching analysis history for:', clerkUserId);
    
    const response = await fetch(`${API_URL}/api/skills/history/${clerkUserId}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch history');
    }

    const data = await response.json();
    console.log('✅ History fetched:', data.history.length, 'records');
    return data.history;
  } catch (error) {
    console.error('❌ Error fetching history:', error);
    throw error;
  }
};
