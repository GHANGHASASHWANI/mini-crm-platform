const redisClient = require("../config/redisClient");
const Customer = require("../models/Customer");

// Handle incoming Redis messages for customers
const handleCustomerMessage = async (message) => {
  try {
    const data = JSON.parse(message);

    switch (data.action) {
      case "create":
        // Create new customer
        const newCustomer = new Customer(data.customer);
        await newCustomer.save();
        console.log(`✅ Customer created with ID: ${newCustomer._id}`);
        break;

      case "update":
        // Update existing customer
        const updatedCustomer = await Customer.findByIdAndUpdate(
          data.customer._id,
          data.customer,
          { new: true, runValidators: true }
        );
        if (updatedCustomer) {
          console.log(`✅ Customer updated with ID: ${updatedCustomer._id}`);
        } else {
          console.warn(`⚠️ Customer to update not found: ${data.customer._id}`);
        }
        break;

      case "delete":
        // Delete customer
        const deletedCustomer = await Customer.findByIdAndDelete(data.customerId);
        if (deletedCustomer) {
          console.log(`✅ Customer deleted with ID: ${data.customerId}`);
        } else {
          console.warn(`⚠️ Customer to delete not found: ${data.customerId}`);
        }
        break;

      default:
        console.warn(`⚠️ Unknown action received for customer: ${data.action}`);
    }
  } catch (error) {
    console.error("❌ Error processing customer message:", error);
  }
};


const subscribeCustomerData = async () => {
  const subscriber = redisClient.duplicate();
  await subscriber.connect();

  await subscriber.subscribe("customerChannel", async (message) => {
    try {
      const customerData = JSON.parse(message);
      console.log("📥 Received customer data:", customerData);

      const existing = await Customer.findOne({ email: customerData.email });
      if (existing) {
        console.log("Customer already exists, skipping DB insert");
        return;
      }

      const newCustomer = new Customer(customerData);
      await newCustomer.save();
      console.log("✅ Customer saved asynchronously from Redis message");
    } catch (err) {
      console.error("❌ Error processing customer message:", err);
    }
  });
};

module.exports = subscribeCustomerData;
