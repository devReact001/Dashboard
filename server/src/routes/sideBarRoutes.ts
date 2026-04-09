import express from "express";
import { pool } from "../config/db";

const router = express.Router();

// sidebar items
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
});

// notifications
router.get("/notifications", async (req, res) => {
  const result = await pool.query("SELECT * FROM notifications");
  res.json(result.rows);
});

export default router;