
// 3️⃣ /backend/validators/orderValidator.js
const { body } = require('express-validator');

exports.validateCreateOrder = [
  body('customerId').notEmpty().withMessage('Customer ID is required'),
  body('orderAmount').isFloat({ min: 0.01 }).withMessage('Order amount must be greater than 0'),
  body('orderDate').optional().isISO8601().toDate().withMessage('Valid date required'),
  body('status').optional().isIn(['Pending', 'Completed', 'Cancelled']).withMessage('Invalid order status')
];