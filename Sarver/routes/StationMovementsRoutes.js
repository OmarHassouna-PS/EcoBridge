const express = require("express");
const router = express.Router();
const Controller = require("../controllers/StationMovementsController");
const { authPage } = require("../middleware/AuthPage");
const { ProtectionToken } = require("../middleware/ProtectionToken");

router.post("/station_movement", ProtectionToken, authPage(['station']), Controller.addMovement);

router.get("/station_movement", ProtectionToken, authPage(['station']), Controller.getMovement);

router.get("/station_movement/:id", ProtectionToken, authPage(['station']), Controller.getMovementById);

router.put("/station_movement", ProtectionToken, authPage(['station']), Controller.updateMovement);

router.delete("/station_movement/:id", ProtectionToken, authPage(['station']), Controller.deleteMovement);

router.get("/company_movement_for_station", ProtectionToken, authPage(['station']), Controller.getMovementsCompanyForStation);

router.post("/accept_movement", ProtectionToken, authPage(['station']), Controller.acceptMovement);

router.put("/reject_movement/:id", ProtectionToken, authPage(['station']), Controller.rejectMovement);


module.exports = router;