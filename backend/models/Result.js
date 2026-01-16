const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  registerNumber: String,
  name: String,
  subject: String,
  marks: Number,
  status: String
});

module.exports = mongoose.model("Result", resultSchema);
