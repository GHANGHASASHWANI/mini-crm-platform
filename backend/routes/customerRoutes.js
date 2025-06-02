// const express = require("express");
// const router = express.Router();
// const customerController = require("../controllers/customerController");
// const { validateCreateCustomer } = require('../validators/customerValidator');
// const { validate } = require('../middleware/validateRequest');

// router.post('/', validateCreateCustomer, validate, customerController.createCustomer);


// // 🔹 Create
// router.post("/", customerController.createCustomer);

// // 🔹 Read All
// router.get("/", customerController.getAllCustomers);

// // 🔹 Read One
// router.get("/:id", customerController.getCustomerById);

// // 🔹 Update
// router.put("/:id", customerController.updateCustomer);

// // 🔹 Delete
// router.delete("/:id", customerController.deleteCustomer);

// module.exports = router;


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