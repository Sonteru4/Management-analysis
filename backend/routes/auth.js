const express = require("express");
const authRouter = express.Router();
const authController = require("../controller/authController");

// Register a new user
authRouter.post("/register", authController.register);

// Login
authRouter.post("/login", authController.login);

// Logout
authRouter.post("/logout",authController.logout)

module.exports = authRouter;