import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import sidebarRoutes from "./routes/sidebarRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import chartRoutes from "./routes/chartRoutes";
import candidateRoutes from "./routes/candidateRoutes";
import sensorRoutes from "./routes/sensorRoutes";
import projectRoutes from "./routes/projectRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

/**
 * 🔥 IMPORTANT: trust proxy (Render / production fix)
 */
app.set("trust proxy", 1);

/**
 * Middlewares
 */
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:4200", // (optional Angular dev)
      "http://localhost:3000", // (optional Next dev)
      "http://localhost:5173", // (optional Vue dev)
      "https://dashboard-brown-eta-81.vercel.app", // Next prod
      "https://dashboard-xip2.vercel.app", // Angular prod
      "https://dashboard-p78f.vercel.app", // Vue prod
    ],
    credentials: true,
  })
);

app.use(express.json());

/**
 * Routes
 */
app.use("/api/auth", authRoutes);
app.use("/api/sidebar", sidebarRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/charts", chartRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/sensor", sensorRoutes);
app.use("/api/projects", projectRoutes);

/**
 * Health check
 */
app.get("/", (req, res) => {
  res.send("Server running");
});

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});