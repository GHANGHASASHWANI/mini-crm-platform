// backend/models/CommunicationLog.js
const mongoose = require("mongoose");

const communicationLogSchema = new mongoose.Schema(
  {
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    status: {
      type: String,
      enum: ["SENT", "FAILED", "PENDING"],
      default: "PENDING",
    },
    message: { type: String, required: true },
    deliveryTime: { type: Date },
  },
  { timestamps: true }
);

const CommunicationLog = mongoose.model(
  "CommunicationLog",
  communicationLogSchema
);
module.exports = CommunicationLog;
