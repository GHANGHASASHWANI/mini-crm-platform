const express = require("express");
const multer = require("multer");
const fs = require("fs/promises"); // using promises version for async
const Customer = require("../models/Customer");
const Segment = require("../models/Segment");
const Campaign = require("../models/Campaign");
const Order = require("../models/Order");
const CommunicationLog = require("../models/CommunicationLog");

const upload = multer({ dest: "uploads/" });
const router = express.Router();
router.post("/full", upload.single("file"), async (req, res) => {
  console.log("Received file:", req.file);
  if (!req.file) return res.status(400).send("No file uploaded");

  try {
    const dataBuffer = await fs.readFile(req.file.path);
    const jsonData = JSON.parse(dataBuffer.toString());
    console.log("Parsed JSON data:", jsonData);

    await fs.unlink(req.file.path);

    async function insertData(Model, data) {
      if (!data) return 0;
      if (Array.isArray(data)) {
        console.log(
          `Inserting ${Model.modelName} array of length:`,
          data.length
        );
        const result = await Model.insertMany(data);
        return result.length;
      } else {
        console.log(`Inserting single ${Model.modelName} record`);
        await new Model(data).save();
        return 1;
      }
    }

    const counts = {};
    counts.customer = await insertData(Customer, jsonData.customers);
    counts.segment = await insertData(Segment, jsonData.segments);
    counts.campaign = await insertData(Campaign, jsonData.campaigns);
    counts.order = await insertData(Order, jsonData.orders);
    counts.communicationLog = await insertData(
      CommunicationLog,
      jsonData.communicationLogs
    );

    console.log("Inserted counts:", counts);

    res.status(201).json({ message: "Data inserted successfully", counts });
  } catch (err) {
    console.error("Error processing upload:", err.stack);
    if (req.file) await fs.unlink(req.file.path).catch(() => {});
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
