// controllers/userController.js
import userModel from "../model/userModel.js";
import JobSeekerModel from "../model/JobSeekerModel.js";
import BusinessModel from "../model/BusinessModel.js";
import bcrypt from "bcryptjs";

// ----------------------------
//   CREATE USER (SIGNUP)
// ----------------------------
export const createUser = async (req, res) => {
  
  try {
    const { username, email, password, type } = req.body;

    // Validate fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check duplicate email
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      type
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        type: user.type
      },
    });

    console.log("User Data : ", req.body)

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ----------------------------
//   LOGIN USER
// ----------------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Fetch profile data based on type
    let profileData = null;
    if (user.type === "jobseeker") {
      profileData = await JobSeekerModel.findOne({ email: user.email });
    } else if (user.type === "business") {
      profileData = await BusinessModel.findOne({ email: user.email });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        email: user.email,
        type: user.type,
      },
      profile: profileData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ----------------------------
//   GET ALL USERS
// ----------------------------
export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ----------------------------
//   GET USER BY EMAIL (FOR CLERK SYNC)
// ----------------------------
export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Fetch profile data based on type
    let profileData = null;
    if (user.type === "jobseeker") {
      profileData = await JobSeekerModel.findOne({ email: user.email });
    } else if (user.type === "business") {
      profileData = await BusinessModel.findOne({ email: user.email });
    }

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        type: user.type,
      },
      profile: profileData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};