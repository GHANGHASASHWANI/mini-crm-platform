const mongoose = require("mongoose");

// Replace with your MongoDB connection string
const mongoURI = "mongodb://localhost:27017/mini_crm";

// Define Segment Schema & Model
const segmentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  rules: { type: Object, required: true }, // Store flexible rule logic as JSON
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional, if you implement auth later
}, { timestamps: true });
const Segment = mongoose.model("Segment", segmentSchema);

// Define Customer Schema & Model
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  totalSpend: { type: Number, default: 0 },
  visits: { type: Number, default: 0 },
  lastActiveDate: { type: Date, default: Date.now },
}, { timestamps: true });
const Customer = mongoose.model("Customer", customerSchema);

// Define Campaign Schema & Model
const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  segment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Segment",
    required: true,
  },
  sent: { type: Number, default: 0 },
  failed: { type: Number, default: 0 },
  audienceSize: { type: Number, default: 0 },
}, { timestamps: true });
const Campaign = mongoose.model("Campaign", campaignSchema);

// Define Order Schema & Model
const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  orderAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Cancelled"],
    default: "Pending",
  },
}, { timestamps: true });
const Order = mongoose.model("Order", orderSchema);

// Define CommunicationLog Schema & Model
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


async function seedData() {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    // --- Clear existing data ---
    console.log("Clearing existing data...");
    await CommunicationLog.deleteMany({});
    await Order.deleteMany({});
    await Campaign.deleteMany({});
    await Customer.deleteMany({});
    await Segment.deleteMany({});
    console.log("Data cleared.");

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

seedData();