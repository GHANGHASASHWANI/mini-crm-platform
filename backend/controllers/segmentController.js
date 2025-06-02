const Segment = require('../models/Segment');

// 🔹 Create a new segment
exports.createSegment = async (req, res) => {
  try {
    const segment = new Segment(req.body);
    await segment.save();
    res.status(201).json(segment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 🔹 Get all segments
exports.getAllSegments = async (req, res) => {
  try {
    const segments = await Segment.find();
    res.json(segments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Get segment by ID
exports.getSegmentById = async (req, res) => {
  try {
    const segment = await Segment.findById(req.params.id);
    if (!segment) {
      return res.status(404).json({ message: "Segment not found" });
    }
    res.json(segment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Update segment
exports.updateSegment = async (req, res) => {
  try {
    const segment = await Segment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!segment) {
      return res.status(404).json({ message: "Segment not found" });
    }

    res.json({ message: "Segment updated successfully", segment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 🔹 Delete segment
exports.deleteSegment = async (req, res) => {
  try {
    const segment = await Segment.findByIdAndDelete(req.params.id);
    if (!segment) {
      return res.status(404).json({ message: "Segment not found" });
    }

    res.json({ message: "Segment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
