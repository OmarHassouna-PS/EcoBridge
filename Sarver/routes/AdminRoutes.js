const express = require("express");
const router = express.Router();
const Controller = require("../controllers/AdminController");
const { createToken } = require("../middleware/createToken");
const {authPage} = require("../middleware/AuthPage");
const {ProtectionToken} = require("../middleware/ProtectionToken");

router.get("/admin",     ProtectionToken, authPage(['admin']), Controller.getAllAdmin);
router.get("/admin/:id", ProtectionToken, authPage(['admin']), Controller.getAdminById);
router.post("/admin",    ProtectionToken, authPage(['admin']), Controller.addAdmin, createToken);
router.put("/admin/:id",     ProtectionToken, authPage(['admin']), Controller.updateAdmin);
router.delete("/admin/:id",  ProtectionToken, authPage(['admin']), Controller.deleteAdmin);

module.exports = router;