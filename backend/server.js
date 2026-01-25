const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

/* =========================
   🔹 Prometheus Setup
========================= */
const client = require("prom-client");

// Collect default Node.js metrics
client.collectDefaultMetrics();

// Custom registry
const register = client.register;

// HTTP request duration metric
const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status"],
});

/* =========================
   🔹 Express App
========================= */
const app = express();
app.use(cors());
app.use(express.json());

// Track request duration
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on("finish", () => {
    end({
      method: req.method,
      route: req.route?.path || req.path,
      status: res.statusCode,
    });
  });
  next();
});

/* =========================
   🔹 MongoDB Connection
========================= */
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI not defined in environment variables");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

/* =========================
   🔹 Routes
========================= */
const resultRoutes = require("./routes/resultRoutes");
app.use("/api/results", resultRoutes);

// 🔹 Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

// 🔹 Prometheus metrics endpoint ⭐
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

/* =========================
   🔹 Server Start
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
