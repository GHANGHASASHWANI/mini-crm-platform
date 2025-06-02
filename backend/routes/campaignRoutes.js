
// 🚀 CAMPAIGN ROUTES WITH VALIDATION
const campaignRouter = require("express").Router();
const campaignController = require("../controllers/campaignController");
const { validateCreateCampaign } = require("../validators/campaignValidator");
const validate = require("../middleware/validateRequest");

campaignRouter.post("/", validateCreateCampaign, validate, campaignController.createCampaign);
campaignRouter.get("/", campaignController.getAllCampaigns);
campaignRouter.get("/:id", campaignController.getCampaignById);
campaignRouter.put("/:id", validateCreateCampaign, validate, campaignController.updateCampaign);
campaignRouter.delete("/:id", campaignController.deleteCampaign);
campaignRouter.get("/summary/ai", campaignController.getCampaignSummaryAI);

module.exports = campaignRouter;
