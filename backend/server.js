const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const resultRoutes = require("./routes/resultRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas URI
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI not defined");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

app.use("/api/results", resultRoutes);

// ✅ PORT from env with fallback
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
