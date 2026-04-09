import express from "express";
import { pool } from "../config/db";

const router = express.Router();

// area chart
router.get("/area", async (req, res) => {
  const result = await pool.query("SELECT * FROM area_chart");
  res.json(result.rows);
});

// bar chart
router.get("/bar", async (req, res) => {
  const result = await pool.query("SELECT * FROM bar_chart");
  res.json(result.rows);
});

// pie / doughnut
router.get("/doughnut", async (req, res) => {

  const result = await pool.query(
    "SELECT * FROM doughnut_chart"
  );

  res.json(result.rows);
});

router.get("/pie", async (req, res) => {

  const result = await pool.query(
    "SELECT * FROM charts_simple"
  );

  res.json(result.rows);
});

export default router;