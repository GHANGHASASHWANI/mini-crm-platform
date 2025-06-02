const CommunicationLog = require("../models/CommunicationLog");

// Create a new log
exports.createLog = async (req, res) => {
  try {
    const log = new CommunicationLog(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (error) {
    res.status(400).json({ message: "Creation Failed", error });
  }
};

// Get all logs (with campaign & customer populated)
exports.getAllLogs = async (req, res) => {
  try {
    const logs = await CommunicationLog.find()
      .populate("campaignId", "name")
      .populate("customerId", "name email");
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Fetch Failed", error });
  }
};

// Get log by ID
exports.getLogById = async (req, res) => {
  try {
    const log = await CommunicationLog.findById(req.params.id)
      .populate("campaignId", "name")
      .populate("customerId", "name email");

    if (!log) {
      return res.status(404).json({ message: "Log not found" });
    }

    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ message: "Fetch Failed", error });
  }
};

// Update log by ID
exports.updateLog = async (req, res) => {
  try {
    const log = await CommunicationLog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!log) {
      return res.status(404).json({ message: "Log not found" });
    }
    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ message: "Update Failed", error });
  }
};

// Delete log by ID
exports.deleteLog = async (req, res) => {
  try {
    const log = await CommunicationLog.findByIdAndDelete(req.params.id);
    if (!log) {
      return res.status(404).json({ message: "Log not found" });
    }
    res.status(200).json({ message: "Log deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete Failed", error });
  }
};
