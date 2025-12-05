import BusinessModel from "../model/BusinessModel.js";

// Create Business
export const createBusiness = async (req, res) => {
  try {
    console.log("🔥🔥 CREATE BUSINESS CONTROLLER HIT!");
    console.log("Received data:", req.body);

    const business = new BusinessModel(req.body);
    const savedBusiness = await business.save();
    res.status(201).json({
      success: true,
      message: "Business created successfully",
      data: savedBusiness,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all Businesses
export const getBusinesses = async (req, res) => {
  try {
    const businesses = await BusinessModel.find();

    res.status(200).json({
      success: true,
      data: businesses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Business by ID
export const getBusinessById = async (req, res) => {
  try {
    const business = await BusinessModel.findById(req.params.id);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      });
    }

    res.status(200).json({
      success: true,
      data: business,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Business
export const updateBusiness = async (req, res) => {
  try {
    const updatedBusiness = await BusinessModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBusiness) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Business updated successfully",
      data: updatedBusiness,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Business
export const deleteBusiness = async (req, res) => {
  try {
    const business = await BusinessModel.findByIdAndDelete(req.params.id);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Business deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
