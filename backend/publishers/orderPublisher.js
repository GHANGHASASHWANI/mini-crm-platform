const redisClient = require("../config/redisClient");

const publishOrderData = async (orderData) => {
  try {
    await redisClient.publish("orderChannel", JSON.stringify(orderData));
    console.log("📤 Order data published to Redis channel");
  } catch (err) {
    console.error("❌ Error publishing order data:", err);
  }
};

module.exports = publishOrderData;
