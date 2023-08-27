const express = require("express");
const router = express.Router();
const Controller = require("../controllers/PublicEndpointsController");
require("dotenv").config();

// General stats
router.get("/general_stats", Controller.getGeneralStats);


module.exports = router;