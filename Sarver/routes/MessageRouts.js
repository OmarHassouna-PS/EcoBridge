const express = require("express");
const router = express.Router();
const Controller = require("../controllers/MessageController");
const {authPage} = require("../middleware/AuthPage");
const {ProtectionToken} = require("../middleware/ProtectionToken");

router.post("/message", Controller.addMessage);
router.get("/message",    ProtectionToken, authPage(['admin']), Controller.getAllMassages);
router.get("/message_search",    ProtectionToken, authPage(['admin']), Controller.searchForMassages);
router.delete("/message/:id",    ProtectionToken, authPage(['admin']), Controller.deleteMessage);

module.exports = router;