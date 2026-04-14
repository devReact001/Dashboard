import express from "express";
import { pool } from "../config/db";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// 🔒 Protect all candidate routes
router.use(authMiddleware);

// headers
router.get("/headers", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM table_headers");
    res.json(result.rows);
  } catch (error) {
    console.error("Headers Error:", error);
    res.status(500).json({ message: "Failed to fetch headers" });
  }
});

// candidate detail
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ validation
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: "Invalid candidate ID" });
    }

    const result = await pool.query(
      "SELECT * FROM candidates WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Candidate Detail Error:", error);
    res.status(500).json({ message: "Failed to fetch candidate" });
  }
});

// candidates list (pagination)
router.get("/", async (req, res) => {
  try {
    let page = parseInt(req.query.page as string) || 1;
    let limit = parseInt(req.query.limit as string) || 5;

    // ✅ safety limits
    if (page < 1) page = 1;
    if (limit < 1 || limit > 50) limit = 5;

    const offset = (page - 1) * limit;

    const dataQuery = `
      SELECT * FROM candidates
      ORDER BY id
      LIMIT $1 OFFSET $2
    `;

    const countQuery = `SELECT COUNT(*) FROM candidates`;

    const [dataResult, countResult] = await Promise.all([
      pool.query(dataQuery, [limit, offset]),
      pool.query(countQuery),
    ]);

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