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

router.post("/set_profit_ratio", ProtectionToken, Controller.setProfitRatio);

// Company
router.delete("/dashboard_company/:id", ProtectionToken, authPage(['admin']), Controller.deleteCompany);
router.get("/dashboard_company",        ProtectionToken, authPage(['admin']), Controller.getCompanies);
router.get("/dashboard_company_search",    ProtectionToken, authPage(['admin']), Controller.searchForCompany);

// Stations
router.delete("/dashboard_station/:id", ProtectionToken, authPage(['admin']), Controller.deleteStation);
router.get("/dashboard_station",        ProtectionToken, authPage(['admin']), Controller.getStations);
router.get("/dashboard_station_search",    ProtectionToken, authPage(['admin']), Controller.searchForStation);
router.put("/dashboard_accept_station",    ProtectionToken, authPage(['admin']), Controller.acceptStation);

// Requests
router.delete("/dashboard_request/:id", ProtectionToken, authPage(['admin']), Controller.deleteRequest);
router.get("/dashboard_request",        ProtectionToken, authPage(['admin']), Controller.getRequests);
router.get("/dashboard_request_search",    ProtectionToken, authPage(['admin']), Controller.searchForRequest);
router.put("/dashboard_accept_request",    ProtectionToken, authPage(['admin']), Controller.acceptRequest);

// Capture Request
router.delete("/dashboard_capture_request/:id", ProtectionToken, authPage(['admin']), Controller.deleteCaptureRequest);
router.get("/dashboard_capture_request",        ProtectionToken, authPage(['admin']), Controller.getCaptureRequests);
router.get("/dashboard_capture_request_search",    ProtectionToken, authPage(['admin']), Controller.searchForCaptureRequest);
router.put("/dashboard_capture_request_change_condition",    ProtectionToken, authPage(['admin']), Controller.changeConditionCaptureRequest);


// Main Counters
router.get("/count_companies",    ProtectionToken, authPage(['admin']), Controller.countCompanies);
router.get("/count_stations",    ProtectionToken, authPage(['admin']), Controller.countStations);
router.get("/count_requests",    ProtectionToken, authPage(['admin']), Controller.countRequests);
router.get("/count_capture_Request",    ProtectionToken, authPage(['admin']), Controller.countCaptureRequest);
router.get("/count_companies_movements",    ProtectionToken, authPage(['admin']), Controller.countCompaniesMovements);
router.get("/count_stations_movements",    ProtectionToken, authPage(['admin']), Controller.countStationsMovements);
router.get("/company_info_query",    ProtectionToken, authPage(['admin']), Controller.companyInfoQuery);
router.get("/station_info_query",    ProtectionToken, authPage(['admin']), Controller.stationInfoQuery);
router.get("/requests_info_query",    ProtectionToken, authPage(['admin']), Controller.requestsInfoQuery);
router.get("/companyMovements_info_query",    ProtectionToken, authPage(['admin']), Controller.companyMovementsInfoQuery);
router.get("/stationMovements_info_query",    ProtectionToken, authPage(['admin']), Controller.stationMovementsInfoQuery);
router.get("/captureRequest_info_query",    ProtectionToken, authPage(['admin']), Controller.captureRequestInfoQuery);
router.get("/earnings_info_query",    ProtectionToken, authPage(['admin']), Controller.earningsInfoQuery);
router.get("/get_traffic",  ProtectionToken, authPage(['admin']), Controller.getTraffic);
router.get("/all_month_profit",  ProtectionToken, authPage(['admin']), Controller.allMonthProfit);


module.exports = router;