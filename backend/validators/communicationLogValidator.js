
// 6️⃣ /backend/validators/communicationLogValidator.js
const { body } = require('express-validator');

exports.validateCreateLog = [
  body('campaignId').notEmpty().withMessage('Campaign ID is required'),
  body('customerId').notEmpty().withMessage('Customer ID is required'),
  body('status').optional().isIn(['SENT', 'FAILED', 'PENDING']).withMessage('Invalid status'),
  body('message').notEmpty().withMessage('Message is required'),
  body('deliveryTime').optional().isISO8601().toDate().withMessage('Valid date required')
];
