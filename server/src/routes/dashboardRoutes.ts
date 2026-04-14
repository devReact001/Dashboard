import express from "express";
import { pool } from "../config/db";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// 🔒 Protect dashboard routes
router.use(authMiddleware);

// 📊 stats
router.get("/stats", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM dashboard_stats");

    // ✅ handle empty table safely
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No stats found" });
    }

    res.json(result.rows[0]); // 🔥 unchanged response
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});

export default router;