const Campaign = require("../models/Campaign");
const Segment = require("../models/Segment");
const Customer = require("../models/Customer");
const CommunicationLog = require("../models/CommunicationLog");

// Simulate 90% success rate
function simulateSendMessage() {
  return Math.random() < 0.9;
}

const mongoose = require("mongoose");

exports.createCampaign = async (req, res) => {
  try {
    const { name, segment } = req.body;

    // Validate segment ID
    if (!segment || segment.length !== 24) {
      return res.status(400).json({ message: "Invalid segment ID format" });
    }

    const segmentData = await Segment.findById(segment);
    if (!segmentData) {
      return res.status(400).json({ message: "Segment not found" });
    }

    // Create the campaign
    const campaign = new Campaign({ name, segment });
    await campaign.save();

    // Get all customers
    const customers = await Customer.find();

    // Create communication logs
    const logs = customers.map((customer) => {
      const success = simulateSendMessage();
      return {
        campaignId: campaign._id,
        customerId: customer._id,
        status: success ? "SENT" : "FAILED",
        message: `Hello ${customer.name}, this is a campaign message: ${name}`,
        deliveryTime: new Date(),
      };
    });

    await CommunicationLog.insertMany(logs);

    // Update campaign stats
    const sentCount = logs.filter((l) => l.status === "SENT").length;
    const failedCount = logs.length - sentCount;

    campaign.sent = sentCount;
    campaign.failed = failedCount;
    campaign.audienceSize = logs.length;
    await campaign.save();

    res.status(201).json({
      message: "Campaign created successfully",
      campaign,
      sentCount,
      failedCount,
      audienceSize: logs.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error while creating campaign",
      error: error.message,
    });
  }
};

// 🔹 Get All Campaigns
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate("segment");
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Get Campaign by ID
exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate("segment");
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Update Campaign
exports.updateCampaign = async (req, res) => {
  try {
    const { name, segment } = req.body;
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign)
      return res.status(404).json({ message: "Campaign not found" });

    if (segment) {
      const segmentExists = await Segment.findById(segment);
      if (!segmentExists) {
        return res.status(400).json({ message: "Invalid segment ID" });
      }
      campaign.segment = segment;
    }

    if (name) campaign.name = name;

    await campaign.save();
    res.json({ message: "Campaign updated", campaign });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// 🔹 Delete Campaign
exports.deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.json({ message: "Campaign deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
