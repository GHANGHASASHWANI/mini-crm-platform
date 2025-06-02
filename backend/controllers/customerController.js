const Customer = require("../models/Customer");
const publishCustomerData = require("../publishers/customerPublisher");

// ✅ Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const { name, email, totalSpend, visits, lastActiveDate } = req.body;

    const customerExists = await Customer.findOne({ email });
    if (customerExists) {
      return res.status(400).json({ message: "Customer already exists with this email" });
    }

    const newCustomer = new Customer({
      name,
      email,
      totalSpend,
      visits,
      lastActiveDate,
    });

    await newCustomer.save();

    // Publish new customer data to Redis channel
    await publishCustomerData({
      action: "create",
      customer: newCustomer,
    });

    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✅ Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✅ Get single customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✅ Update customer by ID
exports.updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Publish updated customer data to Redis channel
    await publishCustomerData({
      action: "update",
      customer: updatedCustomer,
    });

    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✅ Delete customer by ID
exports.deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Publish deleted customer data to Redis channel
    await publishCustomerData({
      action: "delete",
      customerId: req.params.id,
    });

    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
