import express from "express";
import { pool } from "../config/db";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// 🔒 Protect all user-related routes
router.use(authMiddleware);

// 🔔 notifications
router.get("/notifications", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM notifications ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Notifications Error:", error);
    res.status(500).json({
      message: "Failed to fetch notifications",
    });
  }
});

// 👤 sidebar / user info
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");

    res.json(result.rows);
  } catch (error) {
    console.error("Users Fetch Error:", error);
    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
});

export default router;