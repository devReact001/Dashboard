import express from "express";
import { pool } from "../config/db";

const router = express.Router();

// GET
router.get("/", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM projects ORDER BY created_at DESC"
  );
  res.json(result.rows);
});

// POST
router.post("/", async (req, res) => {
  const { name, description } = req.body;

  const result = await pool.query(
    "INSERT INTO projects (name, description) VALUES ($1, $2) RETURNING *",
    [name, description]
  );

  res.json(result.rows[0]);
});

// DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM projects WHERE id = $1", [id]);
  res.json({ success: true });
});

export default router;