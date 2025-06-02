const publishOrderData = require("../publishers/orderPublisher");

// ✅ Create a new order (async pub-sub, no direct DB save here)
exports.createOrder = async (req, res) => {
  try {
    const { customerId, orderAmount, orderDate, status } = req.body;

    // Basic validation (you can add more)
    if (!customerId || !orderAmount || !orderDate || !status) {
      return res.status(400).json({ message: "Missing required order fields" });
    }

    // Publish create order event to Redis channel
    await publishOrderData({
      action: "create",
      order: { customerId, orderAmount, orderDate, status },
    });

    // Immediately respond that request was accepted
    res.status(202).json({ message: "Order creation accepted and will be processed shortly" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✅ Get all orders (read operations still direct DB)
const Order = require("../models/Order");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("customerId", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("customerId", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✅ Update order by ID (publish update event)
exports.updateOrder = async (req, res) => {
  try {
    const { customerId, orderAmount, orderDate, status } = req.body;

    if (!customerId && !orderAmount && !orderDate && !status) {
      return res.status(400).json({ message: "At least one field is required to update" });
    }

    // Publish update order event to Redis channel
    await publishOrderData({
      action: "update",
      order: { _id: req.params.id, ...req.body },
    });

    res.status(202).json({ message: "Order update accepted and will be processed shortly" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✅ Delete order by ID (publish delete event)
exports.deleteOrder = async (req, res) => {
  try {
    // Publish delete order event to Redis channel
    await publishOrderData({
      action: "delete",
      orderId: req.params.id,
    });

    res.status(202).json({ message: "Order deletion accepted and will be processed shortly" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
