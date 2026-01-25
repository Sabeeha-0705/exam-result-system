const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const resultRoutes = require("./routes/resultRoutes");

/* =========================
   🔹 Prometheus Setup
========================= */
const client = require("prom-client");

// collect default Node.js metrics (CPU, memory, event loop, etc.)
client.collectDefaultMetrics();

// custom registry (optional but clean)
const register = client.register;

/* =========================
   🔹 Express App
========================= */
const app = express();
app.use(cors());
app.use(express.json());

/* =========================
   🔹 MongoDB Connection
========================= */
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI not defined in environment variables");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

/* =========================
   🔹 Routes
========================= */
app.use("/api/results", resultRoutes);

// 🔹 Health check (optional but good practice)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

// 🔹 Prometheus metrics endpoint ⭐ IMPORTANT
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
