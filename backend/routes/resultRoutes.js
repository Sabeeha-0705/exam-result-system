const express = require("express");
const router = express.Router();
const Result = require("../models/Result");

// Get result
router.get("/:regno", async (req, res) => {
  const result = await Result.findOne({ registerNumber: req.params.regno });
  if (!result) {
    return res.status(404).json({ message: "Result not found" });
  }
  res.json(result);
});

// Add result (one-time use)
router.post("/add", async (req, res) => {
  const newResult = new Result(req.body);
  await newResult.save();
  res.json({ message: "Result added successfully" });
});

module.exports = router;
