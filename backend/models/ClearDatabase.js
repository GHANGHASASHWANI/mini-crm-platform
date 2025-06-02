const mongoose = require("mongoose");
const { Customer } = require("./Customer");
const { Order } = require("./Order");
const { Campaign } = require("./Campaign");
const { CommunicationLog } = require("./CommunicationLog");
const { Segment } = require("./Segment");

async function clearSelectedCollections() {
  try {
    await mongoose.connect("mongodb://localhost:27017/mini_crm", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const models = [Customer, Order, Campaign, CommunicationLog, Segment]; // Add your models here
    for (const model of models) {
      const collectionName = model.collection.name;
      await mongoose.connection.db.collection(collectionName).deleteMany({});
      console.log(`Cleared collection: ${collectionName}`);
    }
  } catch (err) {
    console.error("Error clearing collections:", err);
  } finally {
    await mongoose.disconnect();
  }
}

clearSelectedCollections();
