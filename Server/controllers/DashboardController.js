import Dashboard from "../model/DashboardModel.js";

// SAVE / UPDATE DASHBOARD DATA
export const saveDashboardData = async (req, res) => {
  try {
    const {
      clerkUserId,
      name,
      phone,
      location,
      desiredPosition,
      skills,
      educationLevel,
      about
    } = req.body;

    if (!clerkUserId) {
      return res.status(400).json({ error: "clerkUserId is required" });
    }

    const updated = await Dashboard.findOneAndUpdate(
      { clerkUserId },
      {
        name,
        phone,
        location,
        desiredPosition,
        skills,
        educationLevel,
        about,
      },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: "Dashboard data saved successfully",
      data: updated
    });

  } catch (error) {
    console.error("❌ Error saving dashboard data:", error);
    res.status(500).json({ error: "Failed to save dashboard data" });
  }
};

// ⬅️⬅️ NEW CONTROLLER TO FETCH DASHBOARD DATA
export const getDashboardData = async (req, res) => {
  try {
    const { clerkUserId } = req.params;

    const dashboard = await Dashboard.findOne({ clerkUserId });

    if (!dashboard) {
      return res.status(404).json({ error: "Dashboard not found" });
    }

    res.json(dashboard);
  } catch (error) {
    console.error("❌ Error fetching dashboard:", error);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
};
