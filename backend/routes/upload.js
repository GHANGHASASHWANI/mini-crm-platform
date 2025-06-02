// const express = require("express");
// const multer = require("multer");
// const fs = require("fs/promises"); // using promises version for async
// const Customer = require("../models/Customer");
// const Segment = require("../models/Segment");
// const Campaign = require("../models/Campaign");
// const Order = require("../models/Order");
// const CommunicationLog = require("../models/CommunicationLog");

// const upload = multer({ dest: "uploads/" });
// const router = express.Router();
// router.post("/full", upload.single("file"), async (req, res) => {
//   console.log("Received file:", req.file);
//   if (!req.file) return res.status(400).send("No file uploaded");

//   try {
//     const dataBuffer = await fs.readFile(req.file.path);
//     const jsonData = JSON.parse(dataBuffer.toString());
//     console.log("Parsed JSON data:", jsonData);

//     await fs.unlink(req.file.path);

//     async function insertData(Model, data) {
//       if (!data) return 0;
//       if (Array.isArray(data)) {
//         console.log(
//           `Inserting ${Model.modelName} array of length:`,
//           data.length
//         );
//         const result = await Model.insertMany(data);
//         return result.length;
//       } else {
//         console.log(`Inserting single ${Model.modelName} record`);
//         await new Model(data).save();
//         return 1;
//       }
//     }

//     const counts = {};
//     counts.customer = await insertData(Customer, jsonData.customers);
//     counts.segment = await insertData(Segment, jsonData.segments);
//     counts.campaign = await insertData(Campaign, jsonData.campaigns);
//     counts.order = await insertData(Order, jsonData.orders);
//     counts.communicationLog = await insertData(
//       CommunicationLog,
//       jsonData.communicationLogs
//     );

//     console.log("Inserted counts:", counts);

//     res.status(201).json({ message: "Data inserted successfully", counts });
//   } catch (err) {
//     console.error("Error processing upload:", err.stack);
//     if (req.file) await fs.unlink(req.file.path).catch(() => {});
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;
const express = require("express");
const multer = require("multer");
const Customer = require("../models/Customer");
const Segment = require("../models/Segment");
const Campaign = require("../models/Campaign");
const Order = require("../models/Order");
const CommunicationLog = require("../models/CommunicationLog");

// Use memory storage instead of disk storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { 
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

const router = express.Router();

router.post("/full", upload.single("file"), async (req, res) => {
  console.log("Received file:", req.file);
  
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // File is now in memory as req.file.buffer
    const jsonData = JSON.parse(req.file.buffer.toString());
    console.log("Parsed JSON data:", jsonData);

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
    
    // Insert data in parallel for better performance
    const insertPromises = [];
    
    if (jsonData.customers) {
      insertPromises.push(
        insertData(Customer, jsonData.customers).then(count => {
          counts.customer = count;
        })
      );
    }
    
    if (jsonData.segments) {
      insertPromises.push(
        insertData(Segment, jsonData.segments).then(count => {
          counts.segment = count;
        })
      );
    }
    
    if (jsonData.campaigns) {
      insertPromises.push(
        insertData(Campaign, jsonData.campaigns).then(count => {
          counts.campaign = count;
        })
      );
    }
    
    if (jsonData.orders) {
      insertPromises.push(
        insertData(Order, jsonData.orders).then(count => {
          counts.order = count;
        })
      );
    }
    
    if (jsonData.communicationLogs) {
      insertPromises.push(
        insertData(CommunicationLog, jsonData.communicationLogs).then(count => {
          counts.communicationLog = count;
        })
      );
    }

    // Wait for all insertions to complete
    await Promise.all(insertPromises);

    console.log("Inserted counts:", counts);

    res.status(201).json({ 
      message: "Data inserted successfully", 
      counts,
      fileInfo: {
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });

  } catch (err) {
    console.error("Error processing upload:", err.stack);
    
    // Return more specific error messages
    if (err instanceof SyntaxError && err.message.includes('JSON')) {
      return res.status(400).json({ 
        error: "Invalid JSON format in uploaded file",
        details: err.message
      });
    }
    
    res.status(500).json({ 
      error: "Failed to process upload",
      details: err.message
    });
  }
});

module.exports = router;