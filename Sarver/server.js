const express = require("express");
const cors = require("cors");
const { db } = require("./models/connection");
require("dotenv").config();
const companyRouts = require('./routes/CompanyRoutes');
const stationRouts = require('./routes/StationRoutes');
const authenticationRoutes = require('./routes/AuthenticationRoutes');
const adminRoutes = require('./routes/AdminRoutes');
const uploadUserImage = require('./routes/UploadUserImage');
const ResetPassword = require('./routes/ResetPassword');
const RequestRoutes = require('./routes/RequestRoutes');
const CompanyMovementsRoutes = require('./routes/CompanyMovementsRoutes');
const StationMovementsRoutes = require('./routes/StationMovementsRoutes');
const DashBoardRoutes = require('./routes/DashBoardRoutes');
const CaptureRequestsRoutes = require('./routes/CaptureRequestsRoutes');
const MessageRouts = require('./routes/MessageRouts');
const PublicEndpointsRoutes = require('./routes/PublicEndpointsRoutes');

const PORT = process.env.SERVER_PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.use(companyRouts);
app.use(stationRouts);
app.use(authenticationRoutes);
app.use(adminRoutes);
app.use(uploadUserImage);
app.use(ResetPassword);
app.use(RequestRoutes);
app.use(CompanyMovementsRoutes);
app.use(StationMovementsRoutes);
app.use(DashBoardRoutes);
app.use(CaptureRequestsRoutes);
app.use(MessageRouts);
app.use(PublicEndpointsRoutes);

app.get("/", (req, res) => {
    res.send("Welcome To EcoBridge");
});

module.exports = {
    server: app,
    start: () => {
        db.connect((err) => {
            if (err) throw err;
            console.log(`The database ${process.env.DATABASE_NAME} has been connected! `);
        });
        app.listen(PORT, () => {
            console.log(`Server is run in ${PORT}`)
        });
    }
}
