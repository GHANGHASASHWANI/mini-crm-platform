
const Campaign = require("../models/Campaign");
const Customer = require("../models/Customer");
const CommunicationLog = require("../models/CommunicationLog");
// GET /api/analytics/top-campaigns
exports.getTopCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find()
      .sort({ sent: -1 })
      .limit(5)
      .populate("segment", "name");

    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: "Error fetching top campaigns", error: err });
  }
};

// GET /api/analytics/campaign-success
exports.getCampaignSuccessRate = async (req, res) => {
  try {
    const campaigns = await Campaign.find();

    const successRates = campaigns.map(c => ({
      name: c.name,
      successRate: c.sent + c.failed === 0 ? 0 : ((c.sent / (c.sent + c.failed)) * 100).toFixed(2)
    }));

    res.json(successRates);
  } catch (err) {
    res.status(500).json({ message: "Failed to calculate success rates", error: err });
  }
};

// GET /api/analytics/most-engaged-customers
exports.getTopCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ visits: -1 }).limit(5);
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching top customers", error: err });
  }
};


// GET /api/analytics/monthly-campaign-stats
exports.getMonthlyCampaignStats = async (req, res) => {
  try {
    const stats = await Campaign.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalCampaigns: { $sum: 1 },
          totalSent: { $sum: "$sent" },
          totalFailed: { $sum: "$failed" },
        },
      },
      { $sort: { "_id": 1 } },
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch monthly stats", error: err });
  }
};

// GET /api/analytics/delivery-status
exports.getDeliveryStatusStats = async (req, res) => {
  try {
    const stats = await CommunicationLog.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: "Failed to get delivery status", error: err });
  }
};
