const redisClient = require("../config/redisClient");

const publishCustomerData = async (customerData) => {
  try {
    await redisClient.publish("customerChannel", JSON.stringify(customerData));
    console.log("📤 Customer data published to Redis channel");
  } catch (err) {
    console.error("❌ Error publishing customer data:", err);
  }
};

module.exports = publishCustomerData;
