const express = require("express");
const router = express.Router();
const Controller = require("../controllers/CompanyMovementsController");
const { authPage } = require("../middleware/AuthPage");
const { ProtectionToken } = require("../middleware/ProtectionToken");

router.post("/company_movement", ProtectionToken, authPage(['company']), Controller.addMovement);

router.get("/company_movement", ProtectionToken, authPage(['company']), Controller.getMovements);

router.get("/company_movement/:id", ProtectionToken, authPage(['company']), Controller.getMovementById);

router.put("/company_movement", ProtectionToken, authPage(['company']), Controller.updateMovement);

router.delete("/company_movement/:id", ProtectionToken, authPage(['company']), Controller.deleteMovement);


module.exports = router;