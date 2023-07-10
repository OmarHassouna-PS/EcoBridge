const express = require("express");
const router = express.Router();
const Controller = require("../controllers/CaptureRequestsController");
const {authPage} = require("../middleware/AuthPage");
const {ProtectionToken} = require("../middleware/ProtectionToken");


router.get("/details_capture_request_process/:movementId", ProtectionToken, authPage(['company']), Controller.getCaptureRequest);
router.post("/capture_request", ProtectionToken, authPage(['company']), Controller.addCaptureRequest);

router.get("/capture_requests_company", ProtectionToken, authPage(['company']), Controller.getCaptureRequestsCompany);
router.get("/capture_requests_station", ProtectionToken, authPage(['station']), Controller.getCaptureRequestsStation);


module.exports = router;