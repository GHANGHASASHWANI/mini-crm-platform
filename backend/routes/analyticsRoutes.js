const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");

router.get("/top-campaigns", analyticsController.getTopCampaigns);
router.get("/campaign-success", analyticsController.getCampaignSuccessRate);
router.get("/most-engaged-customers", analyticsController.getTopCustomers);
router.get("/monthly-campaign-stats", analyticsController.getMonthlyCampaignStats);
router.get("/delivery-status", analyticsController.getDeliveryStatusStats);

module.exports = router;
