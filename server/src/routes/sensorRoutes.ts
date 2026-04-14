import express from "express";
import { pool } from "../config/db";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// 🔒 Protect sensor routes
router.use(authMiddleware);

// 📍 by location
router.get("/:location", async (req, res) => {
  try {
    const { location } = req.params;

    // ✅ validation
    if (!location || typeof location !== "string") {
      return res.status(400).json({
        message: "Invalid location",
      });
    }

    const result = await pool.query(
      "SELECT * FROM sensor_data WHERE location = $1 ORDER BY time",
      [location]
    );

    // ✅ optional: empty check (no breaking change)
    if (result.rows.length === 0) {
      return res.json([]); // keep same format
    }

    res.json(result.rows);
  } catch (error) {
    console.error("Sensor Data Error:", error);
    res.status(500).json({
      message: "Failed to fetch sensor data",
    });
  }
});

export default router;