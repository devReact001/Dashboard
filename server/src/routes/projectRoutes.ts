import express from "express";
import { pool } from "../config/db";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// 🔒 Protect all project routes
router.use(authMiddleware);

// 📄 GET project by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ validation
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    const result = await pool.query(
      "SELECT * FROM projects WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Project Detail Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch project",
    });
  }
});

// 📁 GET all projects
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM projects ORDER BY created_at DESC"
    );

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Projects Fetch Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
});

// ➕ CREATE project
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;

    // ✅ validation
    if (!name || typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: "Project name is required",
      });
    }

    const result = await pool.query(
      "INSERT INTO projects (name, description) VALUES ($1, $2) RETURNING *",
      [name.trim(), description || null]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Project Create Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create project",
    });
  }
});

// 🗑 DELETE project
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ validation
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    const result = await pool.query(
      "DELETE FROM projects WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted",
    });
  } catch (error) {
    console.error("Project Delete Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
    });
  }
});

export default router;