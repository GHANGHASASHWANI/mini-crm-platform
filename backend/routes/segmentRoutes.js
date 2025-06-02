
// 🚀 SEGMENT ROUTES WITH VALIDATION
const segmentRouter = require("express").Router();
const segmentController = require("../controllers/segmentController");
const { validateCreateSegment } = require("../validators/segmentValidator");
const validate = require("../middleware/validateRequest");

segmentRouter.post("/", validateCreateSegment, validate, segmentController.createSegment);
segmentRouter.get("/", segmentController.getAllSegments);
segmentRouter.get("/:id", segmentController.getSegmentById);
segmentRouter.put("/:id", validateCreateSegment, validate, segmentController.updateSegment);
segmentRouter.delete("/:id", segmentController.deleteSegment);

module.exports = segmentRouter;