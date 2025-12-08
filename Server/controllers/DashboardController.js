import Dashboard from "../model/DashboardModel.js";

export const saveDashboardData = async (req, res) => {
  try {
    const { clerkUserId, phone, location, desiredJobPosition, skills, educationLevel, aboutYou } = req.body;

    if (!clerkUserId) {
      return res.status(400).json({ error: "clerkUserId is required" });
    }

    // FIX: correct MongoDB fields
    const updated = await Dashboard.findOneAndUpdate(
      { clerkUserId },
      {
        phone,
        location,
        desiredPosition: desiredJobPosition, // FIXED
        skills,
        educationLevel,
        about: aboutYou, // FIXED
      },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: "Dashboard data saved successfully",
      data: updated,
    });

  } catch (error) {
    console.error("❌ Error saving dashboard data:", error);
    res.status(500).json({ error: "Failed to save dashboard data" });
  }
};
