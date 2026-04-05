const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "deleted"],
    default: "active",
  },
}, { timestamps: true });

module.exports = mongoose.model("Record", recordSchema);