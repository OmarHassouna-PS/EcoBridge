const express = require("express");
const router = express.Router();
const Controller = require("../controllers/RequestController");
const { authPage } = require("../middleware/AuthPage");
const { ProtectionToken } = require("../middleware/ProtectionToken");
const multer = require('multer');

const upload = multer({ storage:multer.memoryStorage()});

// For Companies
router.post('/request', ProtectionToken, authPage(['company']), upload.any('images'), Controller.addRequest);

router.get("/request", ProtectionToken, authPage(['company']), Controller.getRequests);

router.get("/request/:id", ProtectionToken, authPage(['company']), Controller.getRequest);

router.put("/request", ProtectionToken, authPage(['company']), upload.any('images'), Controller.updateRequest);

router.delete("/request/:id", ProtectionToken, authPage(['company']), Controller.deleteRequest);

// For Stations
router.get("/getAllRequests", ProtectionToken, authPage(['station']), Controller.getAllRequest);

router.get("/getRequestByID/:id", ProtectionToken, authPage(['station']), Controller.getRequestByID);

module.exports = router;