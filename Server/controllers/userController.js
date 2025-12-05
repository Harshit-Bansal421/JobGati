// controllers/userController.js
import userModel from "../model/userModel.js";

// Create user (basic function)
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    const user = await userModel.create({ name, email, password });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();

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
