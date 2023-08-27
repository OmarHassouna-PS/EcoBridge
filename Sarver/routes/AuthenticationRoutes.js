const express = require("express");
const router = express.Router();
const Controller = require("../controllers/AuthenticationController");
const { createToken } = require("../middleware/createToken");
const { ProtectionToken } = require("../middleware/ProtectionToken");
const { trackUsers } = require("../middleware/TrackTraffic");


router.post("/logIn_company", Controller.checkCompany, createToken);

router.post("/logIn_station", Controller.checkStation, createToken);

router.post("/logIn_admin", Controller.checkAdmin, createToken);

router.get("/verify_token", ProtectionToken, (req, res) => {

  const user = req.user;

  const roleToIdMapping = {
    admin: user.admin_id,
    company: user.company_id,
    station: user.station_id,
  };

  const id = roleToIdMapping[user?.role];
  
  res.json({ role: user.role, id: id });
});



module.exports = router;