const express = require("express");
const router = express.Router();
const Controller = require("../controllers/DashBoardController");
const { authPage } = require("../middleware/AuthPage");
const { ProtectionToken } = require("../middleware/ProtectionToken");
require("dotenv").config();



router.get("/get_profit_ratio/:key", ProtectionToken, (req, res, next) => {
    const key = req.params.key;
    if (key === process.env.PROFIT_INFO)
        next();

}, Controller.getProfitRatio);

router.get("/set_profit_ratio", ProtectionToken);


module.exports = router;