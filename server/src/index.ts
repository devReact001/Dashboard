import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});
import express from "express";
import cors from "cors";

import sidebarRoutes from "./routes/sideBarRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import chartRoutes from "./routes/chartRoutes";
import candidateRoutes from "./routes/candidateRoutes";
import sensorRoutes from "./routes/sensorRoutes";


const app = express();
console.log("ENV:", process.env.DATABASE_URL);

app.use(cors());
app.use(express.json());

app.use("/api/sidebar", sidebarRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/charts", chartRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/sensor", sensorRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});

import { pool } from "./config/db";

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err: any) {
    console.error("DB ERROR FULL:", err);   // 👈 IMPORTANT
    res.status(500).json({
      message: "DB failed",
      error: err.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});