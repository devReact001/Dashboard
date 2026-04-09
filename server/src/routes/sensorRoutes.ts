import express from "express";
import { pool } from "../config/db";

const router = express.Router();

// by location
router.get("/:location", async (req, res) => {
  const { location } = req.params;

  const result = await pool.query(
    "SELECT * FROM sensor_data WHERE location = $1 ORDER BY time",
    [location]
  );

  res.json(result.rows);
});

export default router;