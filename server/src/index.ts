import dotenv from "dotenv";

dotenv.config();
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

app.use(cors({
  origin: "*", // or your vercel URL later
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/sidebar", sidebarRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/charts", chartRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/sensor", sensorRoutes);
app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});