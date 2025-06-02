
// 5️⃣ /backend/validators/segmentValidator.js
const { body } = require("express-validator");

exports.validateCreateSegment = [
  body("name").notEmpty().withMessage("Segment name is required"),
  body("rules").isObject().withMessage("Rules must be a valid object"),
];

