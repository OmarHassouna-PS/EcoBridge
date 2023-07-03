const jwt = require("jsonwebtoken");
require("dotenv").config();


const createToken = (req, res) => {
    
    const user = req.user;

    const roleToIdMapping = {
        admin: user.admin_id,
        company: user.company_id,
        station: user.station_id,
      };
    
    const id = roleToIdMapping[user?.role];

    const token = jwt.sign({ role : user.role, user_id: id }, process.env.ACCESS_TOKEN_KEY, { expiresIn: process.env.TOKEN_EXPIRATION });

    res.json({token : token, data: user});
};

module.exports = {
    createToken,
}