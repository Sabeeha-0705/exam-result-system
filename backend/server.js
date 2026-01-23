// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const resultRoutes = require("./routes/resultRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Atlas from environment variable
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.error(err));

app.use("/api/results", resultRoutes);

// ✅ IMPORTANT: env PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
