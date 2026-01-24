const express = require("express");
const router = express.Router();
const Result = require("../models/Result");

// ✅ Get ALL results
router.get("/", async (req, res) => {
  try {
    const results = await Result.find();
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get result by register number
router.get("/:regno", async (req, res) => {
  try {
    const result = await Result.findOne({
      registerNumber: req.params.regno,
    });

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Add result
router.post("/add", async (req, res) => {
  try {
    const newResult = new Result(req.body);
    await newResult.save();
    res.json({ message: "Result added successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error adding result" });
  }
});

module.exports = router;
