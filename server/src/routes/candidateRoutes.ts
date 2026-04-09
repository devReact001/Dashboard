import express from "express";
import { pool } from "../config/db";

const router = express.Router();

// headers
router.get("/headers", async (req, res) => {
  const result = await pool.query("SELECT * FROM table_headers");
  res.json(result.rows);
});

// candidates
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const offset = (page - 1) * limit;

    const dataQuery = `
      SELECT * FROM candidates
      ORDER BY id
      LIMIT $1 OFFSET $2
    `;

    const countQuery = `SELECT COUNT(*) FROM candidates`;

    const dataResult = await pool.query(dataQuery, [limit, offset]);
    const countResult = await pool.query(countQuery);

    const total = parseInt(countResult.rows[0].count);

    res.json({
      data: dataResult.rows,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Pagination API Error:", error);
    res.status(500).json({ message: "Failed to fetch candidates" });
  }
});

export default router;