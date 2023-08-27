const { sendEmailFunction } = require("../utils/sendEmail");
const { resetPasswordBody } = require('../utils/htmlEmail')
const jwt = require("jsonwebtoken");
const queries = require("./queries");
const bcrypt = require("bcrypt");
const { db } = require("../models/connection");

const sendEmail = async (req, res) => {
    const { email, operatingSystem, browserName, userType } = req.body

    let user;

    const query = userType === 'company' ? queries.getCompanyByEmail : queries.getStationByEmail;


    try {
        const results = await db.query(query, [email]);
        user = results.rows[0];

    } catch (error) {
        return res.status(400).json(error);
    }
    if (!user) {
        return res.status(404).json({ message: 'user not exist' });
    }

    const roleToIdMapping = {
        company: user.company_id,
        station: user.station_id,
    };

    const id = roleToIdMapping[user?.role];

    const token = jwt.sign({ role: user.role, user_id: id }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '24h' });


    const urlReset = `http://localhost:3000/password-recovery/${token}`
    const body = resetPasswordBody(user.username, operatingSystem, browserName, 'EcoBridge', urlReset, 'www.EcoBridge.com');
    sendEmailFunction(
        email,
        'Reset Password',
        body
    )

    res.send('email send success')
}

const resetPassword = async (req, res) => {

    let user = req.user;

    const roleToIdMapping = {
        company: user.company_id,
        station: user.station_id,
    };

    const id = roleToIdMapping[user?.role];

    const { newPassword, confirmPassword } = req.body;
  
    try {
    
      if (!user || user.is_delete || !id) {
        return res.status(404).send('User not found');
      }
  
      if (newPassword !== confirmPassword) {
        return res.status(400).send("Password does not match");
      }

    } catch (error) {
      return res.status(400).json(error);
    }
    
    const date = new Date();

    const query = user.role === 'company' ? queries.changeCompanyPassword : queries.changeStationPassword;

    const hashPassword = await bcrypt.hash(newPassword, 10);

    await db.query(query,
      [hashPassword, date, id],
      (error, results) => {
        if (error) {
          return res.status(400).json(error);
        }
        res.status(200).json({ message : `The password for the user with id ${id} has been reset successfully`})
      }
    );
  
}



module.exports = {
    sendEmail,
    resetPassword
}