const nodemailer = require('nodemailer');
require("dotenv").config();

const sendEmailFunction = async (to, subject, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // SMTP server address
            port: 465,
            secure: true,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.APP_KEY,
            },
          });
          

        // Define the email options
        const mailOptions = {
            from: 'ecobridge6@gmail.com',
            to,
            subject,
            html: body,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = {
    sendEmailFunction,
}