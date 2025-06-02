
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