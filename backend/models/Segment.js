// backend/models/Segment.js
const mongoose = require("mongoose");

const segmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    rules: { type: Object, required: true }, // Store flexible rule logic as JSON
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional, if you implement auth later
  },
  { timestamps: true }
);

const Segment = mongoose.model("Segment", segmentSchema);
module.exports = Segment;
