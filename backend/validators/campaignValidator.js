// 4️⃣ /backend/validators/campaignValidator.js
const { body } = require('express-validator');

exports.validateCreateCampaign = [
  body('name').notEmpty().withMessage('Campaign name is required'),
  body('segment').notEmpty().withMessage('Segment ID is required')
];