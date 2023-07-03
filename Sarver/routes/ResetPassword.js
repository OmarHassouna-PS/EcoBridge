const express = require("express");
const router = express.Router();
const Controller = require("../controllers/ResetPasswordController");
const { ProtectionToken } = require("../middleware/ProtectionToken");


router.post("/send_email_reset_password", Controller.sendEmail);
router.post("/reset_password", ProtectionToken, Controller.resetPassword);


module.exports = router;
