// 🚀 CUSTOMER ROUTES WITH VALIDATION
const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const { validateCreateCustomer } = require("../validators/customerValidator");
const validate  = require("../middleware/validateRequest");

router.post("/", validateCreateCustomer, validate, customerController.createCustomer);
router.get("/", customerController.getAllCustomers);
router.get("/:id", customerController.getCustomerById);
router.put("/:id", validateCreateCustomer, validate, customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;