import express from "express";
import { pool } from "../config/db";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// 🔒 Protect all chart routes
router.use(authMiddleware);

// 📊 Area chart
router.get("/area", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM area_chart");
    res.json(result.rows);
  } catch (error) {
    console.error("Area Chart Error:", error);
    res.status(500).json({ message: "Failed to fetch area chart data" });
  }
});

// 📊 Bar chart
router.get("/bar", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM bar_chart");
    res.json(result.rows);
  } catch (error) {
    console.error("Bar Chart Error:", error);
    res.status(500).json({ message: "Failed to fetch bar chart data" });
  }
});

// 🍩 Doughnut chart
router.get("/doughnut", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM doughnut_chart"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Doughnut Chart Error:", error);
    res.status(500).json({ message: "Failed to fetch doughnut chart data" });
  }
});

// 🥧 Pie chart
router.get("/pie", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM charts_simple"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Pie Chart Error:", error);
    res.status(500).json({ message: "Failed to fetch pie chart data" });
  }
});

export default router;