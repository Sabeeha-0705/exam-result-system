const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const resultRoutes = require("./routes/resultRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Atlas URI from environment
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI not defined in environment variables");
  process.exit(1);
}

// ✅ MongoDB connection
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

// Routes
app.use("/api/results", resultRoutes);

// ✅ PORT from env with fallback
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
