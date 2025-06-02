// const express = require("express");
// const router = express.Router();
// const orderController = require("../controllers/orderController");

// // 🔹 Create
// router.post("/", orderController.createOrder);

// // 🔹 Read All
// router.get("/", orderController.getAllOrders);

// // 🔹 Read One
// router.get("/:id", orderController.getOrderById);

// // 🔹 Update
// router.put("/:id", orderController.updateOrder);

// // 🔹 Delete
// router.delete("/:id", orderController.deleteOrder);

// module.exports = router;


// 🚀 ORDER ROUTES WITH VALIDATION
const orderRouter = require("express").Router();
const orderController = require("../controllers/orderController");
const { validateCreateOrder } = require("../validators/orderValidator");
const validate = require("../middleware/validateRequest");

orderRouter.post("/", validateCreateOrder, validate, orderController.createOrder);
orderRouter.get("/", orderController.getAllOrders);
orderRouter.get("/:id", orderController.getOrderById);
orderRouter.put("/:id", validateCreateOrder, validate, orderController.updateOrder);
orderRouter.delete("/:id", orderController.deleteOrder);

module.exports = orderRouter;