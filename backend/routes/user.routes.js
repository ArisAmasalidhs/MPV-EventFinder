const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/user.controller");

// Routes
router.post("/register", registerUser); // Endpoint: POST /users/register
router.post("/login", loginUser);       // Endpoint: POST /users/login
router.get("/:id", getUserById);       // Endpoint: GET /users/:id
router.put("/:id", updateUser);        // Endpoint: PUT /users/:id
router.delete("/:id", deleteUser);     // Endpoint: DELETE /users/:id


module.exports = router;
