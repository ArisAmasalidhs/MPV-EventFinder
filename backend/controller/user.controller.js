const User = require("../models/user"); // Import User model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register User
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).send({ msg: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ msg: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      msg: "User registered successfully",
      user: { username, email }, // Return only non-sensitive data
    });
  } catch (error) {
    console.error("Error during user registration:", error.message || error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).send({ msg: "Email and password are required" });
    }

    // Check user existence
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      msg: "Login successful",
      token,
      user: { id: user._id, username: user.username, email: user.email }, // Return non-sensitive user data
    });
  } catch (error) {
    console.error("Error during user login:", error.message || error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

// Get User by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("favoriteEvents");
    if (!user) return res.status(404).send({ msg: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error.message || error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) return res.status(404).send({ msg: "User not found" });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error.message || error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).send({ msg: "User not found" });
    res.status(200).send({ msg: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message || error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
};
