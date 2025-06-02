const redisClient = require("../config/redisClient");
const Order = require("../models/Order");

// /backend/subscribers/orderSubscriber.js

// Function to handle incoming Redis messages
const handleOrderMessage = async (message) => {
  try {
    const data = JSON.parse(message);

    switch (data.action) {
      case "create":
        // Create new order in DB
        const newOrder = new Order(data.order);
        await newOrder.save();
        console.log(`✅ Order created with ID: ${newOrder._id}`);
        break;

      case "update":
        // Update order in DB
        const updatedOrder = await Order.findByIdAndUpdate(
          data.order._id,
          data.order,
          { new: true, runValidators: true }
        );
        if (updatedOrder) {
          console.log(`✅ Order updated with ID: ${updatedOrder._id}`);
        } else {
          console.warn(`⚠️ Order to update not found: ${data.order._id}`);
        }
        break;

      case "delete":
        // Delete order from DB
        const deletedOrder = await Order.findByIdAndDelete(data.orderId);
        if (deletedOrder) {
          console.log(`✅ Order deleted with ID: ${data.orderId}`);
        } else {
          console.warn(`⚠️ Order to delete not found: ${data.orderId}`);
        }
        break;

      default:
        console.warn(`⚠️ Unknown action received: ${data.action}`);
    }
  } catch (error) {
    console.error("❌ Error processing order message:", error);
  }
};


const subscribeOrderData = async () => {
  const subscriber = redisClient.duplicate();
  await subscriber.connect();

  await subscriber.subscribe("orderChannel", async (message) => {
    try {
      const orderData = JSON.parse(message);
      console.log("📥 Received order data:", orderData);

      // Optional: Check for duplicates or business logic here if needed
      // For example, check if order with same ID exists, skip or update

      const newOrder = new Order(orderData);
      await newOrder.save();
      console.log("✅ Order saved asynchronously from Redis message");
    } catch (err) {
      console.error("❌ Error processing order message:", err);
    }
  });
};

module.exports = subscribeOrderData;
