const express = require("express");
// const router = express.Router();
// const communicationLogController = require("../controllers/communicationLogController");

// router.post("/", communicationLogController.createLog);
// router.get("/", communicationLogController.getAllLogs);
// router.get("/:id", communicationLogController.getLogById);
// router.put("/:id", communicationLogController.updateLog);
// router.delete("/:id", communicationLogController.deleteLog);

// module.exports = router;


// 🚀 COMMUNICATION LOG ROUTES WITH VALIDATION
const logRouter = require("express").Router();
const communicationLogController = require("../controllers/communicationLogController");
const { validateCreateLog } = require("../validators/communicationLogValidator");
const validate = require("../middleware/validateRequest");


logRouter.post("/", validateCreateLog, validate, communicationLogController.createLog);
logRouter.get("/", communicationLogController.getAllLogs);
logRouter.get("/:id", communicationLogController.getLogById);
logRouter.put("/:id", validateCreateLog, validate, communicationLogController.updateLog);
logRouter.delete("/:id", communicationLogController.deleteLog);

module.exports = logRouter;