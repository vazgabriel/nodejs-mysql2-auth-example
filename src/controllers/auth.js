/**
 * Auth Controller router Definition
 */
// Import express and create router
const express = require("express");
const router = express.Router();

// Import authModel
const authModel = require("../models/auth");

/**
 * Create register route
 */
router.post("/register", async (req, res) => {
  try {
    // Get user, token and message from register
    const { user, token, message } = await authModel.register(req.body);

    // Return success with status 201
    return res.status(201).json({ user, token, message });
  } catch (error) {
    // Return error with status of error or 500
    return res
      .status(error.status || 500)
      .json({ ...error, status: undefined });
  }
});

/**
 * Create login route
 */
router.post("/login", async (req, res) => {
  try {
    // Get user, token and message from register
    const { user, token, message } = await authModel.login(req.body);

    // Return success with status 200
    return res.status(200).json({ user, token, message });
  } catch (error) {
    // Return error with status of error or 500
    return res
      .status(error.status || 500)
      .json({ ...error, status: undefined });
  }
});

// Export route as /api/auth/*
module.exports = app => app.use("/api/auth", router);
