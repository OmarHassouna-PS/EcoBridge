const express = require("express");
const router = express.Router();
const Controller = require("../controllers/StationController");
const { createToken } = require("../middleware/createToken");
const { authPage } = require("../middleware/AuthPage");
const { ProtectionToken } = require("../middleware/ProtectionToken");

router.post("/update_price", ProtectionToken, authPage(['station']), Controller.updatePrice);
router.post("/station", Controller.addStation, createToken);

router.get("/station", ProtectionToken, authPage(['station', 'company']), Controller.getAllStation);
router.get("/station/:id", ProtectionToken, authPage(['station', 'company']), Controller.getStationById);

router.put("/station", ProtectionToken, authPage(['station']), Controller.updateStation);
router.put("/change_station_password", ProtectionToken, authPage(['station']), Controller.changePassword, createToken);

router.delete("/station", ProtectionToken, authPage(['station']), Controller.deleteStation);


module.exports = router;