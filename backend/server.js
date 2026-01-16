// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();   // 👈 ADD THIS

const resultRoutes = require("./routes/resultRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Atlas connection from .env
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.log(err));

app.use("/api/results", resultRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
