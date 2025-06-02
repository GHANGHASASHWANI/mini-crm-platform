
// 2️⃣ /backend/validators/customerValidator.js
const { body } = require('express-validator');

exports.validateCreateCustomer = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('totalSpend').optional().isFloat({ min: 0 }).withMessage('Total spend must be a positive number'),
  body('visits').optional().isInt({ min: 0 }).withMessage('Visits must be a non-negative integer'),
  body('lastActiveDate').optional().isISO8601().toDate().withMessage('Valid date required')
];

