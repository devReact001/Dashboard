import express from "express";
import { pool } from "../config/db";

const router = express.Router();

// stats
router.get("/stats", async (req, res) => {
  const result = await pool.query("SELECT * FROM dashboard_stats");
  res.json(result.rows[0]);
});

export default router;