const express = require("express");
const router = express.Router();
const Controller = require("../controllers/CompanyController");
const { createToken } = require("../middleware/createToken");
const {authPage} = require("../middleware/AuthPage");
const {ProtectionToken} = require("../middleware/ProtectionToken");

router.get("/company",        ProtectionToken, authPage(['company']), Controller.getAllCompany);
router.get("/company/:id",    ProtectionToken, authPage(['company']), Controller.getCompanyById);

router.post("/company",       Controller.addCompany, createToken);

router.put("/company",    ProtectionToken, authPage(['company']), Controller.updateCompany);
router.put("/change_company_password", ProtectionToken, authPage(['company']), Controller.changePassword, createToken);

router.delete("/company", ProtectionToken, authPage(['company']), Controller.deleteCompany);

router.get("/capture_request/:movementId", ProtectionToken, authPage(['company']), Controller.getCaptureRequest);
router.post("/capture_request", ProtectionToken, authPage(['company']), Controller.addCaptureRequest);


module.exports = router;