import UserProfile from '../models/UserProfile.js';

// Save or update user profile
export const saveProfile = async (req, res) => {
  try {
    const { clerkUserId, ...profileData } = req.body;

    console.log("📝 Saving profile for user:", clerkUserId);

    if (!clerkUserId) {
      return res.status(400).json({ error: "clerkUserId is required" });
    }

    // Find existing profile or create new one
    let profile = await UserProfile.findOne({ clerkUserId });

    if (profile) {
      // Update existing profile
      Object.assign(profile, profileData);
      await profile.save();
      console.log("✅ Profile updated successfully");
    } else {
      // Create new profile
      profile = new UserProfile({
        clerkUserId,
        ...profileData
      });
      await profile.save();
      console.log("✅ Profile created successfully");
    }

    res.json({
      success: true,
      message: "Profile saved successfully",
      profile
    });

  } catch (error) {
    console.error("❌ Error saving profile:", error);
    res.status(500).json({ 
      error: "Failed to save profile", 
      details: error.message 
    });
  }
};

// Get user profile by Clerk user ID
export const getProfile = async (req, res) => {
  try {
    const { clerkUserId } = req.params;

    console.log("🔍 Fetching profile for user:", clerkUserId);

    const profile = await UserProfile.findOne({ clerkUserId });

    if (!profile) {
      return res.status(404).json({ 
        error: "Profile not found",
        message: "No profile exists for this user"
      });
    }

    console.log("✅ Profile found");
    res.json({
      success: true,
      profile
    });

  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    res.status(500).json({ 
      error: "Failed to fetch profile", 
      details: error.message 
    });
  }
};
