const { db, PGP } = require("../models/connection");
const queries = require("./queries");
const { getISOWeek } = require('date-fns');
const { acceptStationBody } = require('../utils/acceptStation')
const { sendEmailFunction } = require("../utils/sendEmail");


// Profit Ratio
const getProfitRatio = async (req, res) => {

    db.query(queries.getProfitInfo,
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            else {
                res.status(200).json(results.rows);
            }
        });
}

const setProfitRatio = async (req, res) => {

    const { rate } = req.body;


    db.query(queries.setProfitInfo, [rate / 100],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            else {
                res.status(200).json(results.rows);
            }
        });
}

// Companies
const searchForCompany = async (req, res) => {
    const { searchType: columnName, searchValue: columnValue, page, limit } = req.query;


    const validSearchType = ['company_id', 'username', 'email', 'address', 'organization_name', 'phone', 'business_type', 'waste_info_range'];

    const offset = (page - 1) * limit;

    if (!validSearchType.includes(columnName)) {
        return res.status(400).send('Not this time');
    }

    const query = {
        text: `SELECT * FROM company WHERE ${columnName} = $1 And is_delete = false ORDER BY username, company_id LIMIT $2 OFFSET $3`,
        values: [columnValue, limit, offset],
    };

    const queryTotal = {
        text: `SELECT COUNT(*) AS total FROM company WHERE ${columnName} = $1 And is_delete = false`,
        values: [columnValue],
    };

    try {
        const { rows } = await db.query(query);

        const totalItems = await db.query(queryTotal);
        const totalItemCount = totalItems.rows[0].total;
        const totalPages = Math.ceil(totalItemCount / limit); // Calculate total pages

        res.status(200).json({
            items: rows,
            totalItems: totalItemCount,
            totalPages: totalPages,
        });

    } catch (error) {
        console.error('Error executing query:', error);
        res.status(400).json([]);
    }
}

const getCompanies = async (req, res) => {
    const { page, limit } = req.query;

    try {
        // Calculate the offset based on the page and limit
        const offset = (page - 1) * limit;

        // Fetch data from the database using the custom query
        const companies = await db.query(queries.getDashboardCompany, [limit, offset]);

        // Get the total number of items in the database
        const totalItems = await db.query('SELECT COUNT(*) AS total FROM company WHERE is_delete = false');

        const totalItemCount = totalItems.rows[0].total;
        const totalPages = Math.ceil(totalItemCount / limit); // Calculate total pages

        // Send the response with data and totalItems
        res.json({
            items: companies.rows,
            totalItems: totalItems.totalItemCount,
            totalPages: totalPages
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteCompany = async (req, res) => {

    const id = req.params.id;
    console.log("🚀 ~ file: DashBoardController.js:83 ~ deleteCompany ~ id:", id)


    db.query(queries.dashboardDeleteCompany,
        [true, id],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            res.status(200).json({ massage: `User with ID: ${id} deleted` });
        }
    );
};

// Stations
const searchForStation = async (req, res) => {
    const { searchType: columnName, searchValue: columnValue, page, limit, active } = req.query;

    const isActive = active === 'true' ? true : false;

    const validSearchType = [
        'station_id',
        'username',
        'email',
        'address',
        'organization_name',
        'phone',
        'business_type',
        'waste_info_range',
    ];

    const offset = (page - 1) * limit;

    if (!validSearchType.includes(columnName)) {
        return res.status(400).send('Not this time');
    }

    const query = {
        text: `SELECT * FROM station WHERE ${columnName} = $1 And is_delete = false AND active = $2 ORDER BY username, station_id LIMIT $3 OFFSET $4`,
        values: [columnValue, isActive, limit, offset],
    };

    const queryTotal = {
        text: `SELECT COUNT(*) AS total FROM station WHERE ${columnName} = $1 And is_delete = false AND active = $2`,
        values: [columnValue, isActive],
    };

    try {
        const { rows } = await db.query(query);

        const totalItems = await db.query(queryTotal);
        const totalItemCount = totalItems.rows[0].total;
        const totalPages = Math.ceil(totalItemCount / limit); // Calculate total pages

        res.status(200).json({
            items: rows,
            totalItems: totalItemCount,
            totalPages: totalPages,
        });

    } catch (error) {
        console.error('Error executing query:', error);
        res.status(400).json([]);
    }
}

const getStations = async (req, res) => {
    const { page, limit, active } = req.query;
    const isActive = active === 'true' ? true : false;

    try {
        // Calculate the offset based on the page and limit
        const offset = (page - 1) * limit;

        // Fetch data from the database using the custom query
        const stations = await db.query(queries.getDashboardStation, [isActive, limit, offset]);

        // Get the total number of items in the database
        const totalItems = await db.query('SELECT COUNT(*) AS total FROM station WHERE is_delete = false AND active = $1', [isActive]);

        const totalItemCount = totalItems.rows[0].total;
        const totalPages = Math.ceil(totalItemCount / limit); // Calculate total pages

        // Send the response with data and totalItems
        res.json({
            items: stations.rows,
            totalItems: totalItems.totalItemCount,
            totalPages: totalPages
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteStation = async (req, res) => {

    const id = req.params.id;


    db.query(queries.dashboardDeleteStation,
        [true, id],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            res.status(200).json({ massage: `User with ID: ${id} deleted` });
        }
    );
};

const acceptStation = async (req, res) => {

    const { condition, id } = req.body;

    let station;

    try {
        const results = await db.query(queries.getStationByIdAny, [id]);
        station = results.rows[0];

    } catch (error) {
        return res.status(400).json(error);
    }

    if (!station) {
        return res.status(404).json({ message: 'Station not exist' });
    }

    let body;

    if (condition) {
        body = acceptStationBody(
            station.username,
            'EcoBridge',
            'www.EcoBridge.com/Login',
            'www.EcoBridge.com',
            'We would like to inform you that your application has been accepted. You can log in using the button below',
            condition
        );
    }
    else {
        body = acceptStationBody(
            station.username,
            'EcoBridge',
            'EcoBridge@gmail.com',
            'www.EcoBridge.com',
            'We would like to inform you that your request to join our site has been rejected. To find out the reason, please contact the support department at this email.',
            condition
        );
    }

    db.query(condition ? queries.dashboardAcceptStation : queries.dashboardDeleteStation,
        [true, id],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            sendEmailFunction(
                station.email,
                condition ? 'Acceptance of the joining request' : 'rejected of the joining request',
                body
            )
            res.status(200).json({ massage: `The request with the ID ${id} has been ${condition ? 'accepted' : 'rejected'}` });
        }
    );
};

// Requests
const searchForRequest = async (req, res) => {
    const { searchType: columnName, searchValue: columnValue, page, limit, active } = req.query;

    const isActive = active === 'true' ? true : false;

    const validSearchType = [
        'requests_id',
        'quantity',
        'material_type',
        'location',
        'organization_name',
        'condition',
        'available',
        'company_id',
        'title',

    ];

    const offset = (page - 1) * limit;

    if (!validSearchType.includes(columnName)) {
        return res.status(400).send('Not this time');
    }

    const query = {
        text: `SELECT * FROM requests WHERE ${columnName} = $1 And is_delete = false AND active = $2 ORDER BY title, requests_id LIMIT $3 OFFSET $4`,
        values: [columnValue, isActive, limit, offset],
    };

    const queryTotal = {
        text: `SELECT COUNT(*) AS total FROM requests WHERE ${columnName} = $1 And is_delete = false AND active = $2`,
        values: [columnValue, isActive],
    };

    try {
        const { rows } = await db.query(query);

        const totalItems = await db.query(queryTotal);
        const totalItemCount = totalItems.rows[0].total;
        const totalPages = Math.ceil(totalItemCount / limit); // Calculate total pages

        res.status(200).json({
            items: rows,
            totalItems: totalItemCount,
            totalPages: totalPages,
        });

    } catch (error) {
        console.error('Error executing query:', error);
        res.status(400).json([]);
    }
}

const getRequests = async (req, res) => {
    const { page, limit, active } = req.query;
    const isActive = active === 'true' ? true : false;

    try {
        // Calculate the offset based on the page and limit
        const offset = (page - 1) * limit;

        // Fetch data from the database using the custom query
        const requests = await db.query(queries.getDashboardRequests, [isActive, limit, offset]);

        // Get the total number of items in the database
        const totalItems = await db.query('SELECT COUNT(*) AS total FROM requests WHERE is_delete = false AND active = $1', [isActive]);

        const totalItemCount = totalItems.rows[0].total;
        const totalPages = Math.ceil(totalItemCount / limit); // Calculate total pages

        // Send the response with data and totalItems
        res.json({
            items: requests.rows,
            totalItems: totalItems.totalItemCount,
            totalPages: totalPages
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteRequest = async (req, res) => {

    const id = req.params.id;


    db.query(queries.dashboardDeleteRequest,
        [true, id],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            res.status(200).json({ massage: `Request with ID: ${id} deleted` });
        }
    );
};

const acceptRequest = async (req, res) => {

    const { condition, id } = req.body;

    let request;
    let company;

    try {
        const resultsReq = await db.query(queries.getRequestByIdAny, [id]);
        request = resultsReq.rows[0];

        const resultsCom = await db.query(queries.getCompanyById, [request.company_id]);
        company = resultsCom.rows[0];

    } catch (error) {
        return res.status(400).json(error);
    }

    if (!request) {
        return res.status(404).json({ message: 'Station not exist' });
    }

    let body;

    if (condition) {
        body = acceptStationBody(
            company.username,
            'EcoBridge',
            'www.EcoBridge.com/Login',
            'www.EcoBridge.com',
            `We would like to inform you that your request with name ${request.title} has been accepted. You can log in using the button below and complete the procedures it`,
            condition
        );
    }
    else {
        body = acceptStationBody(
            company.username,
            'EcoBridge',
            'EcoBridge@gmail.com',
            'www.EcoBridge.com',
            `We would like to inform you that your request with name ${request.title} has been rejected. To find out the reason, please contact the support department at this email.`,
            condition
        );
    }
    db.query(condition ? queries.dashboardAcceptRequest : queries.dashboardDeleteRequest,
        [true, id],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            sendEmailFunction(
                company.email,
                condition ? 'Acceptance your request' : 'rejected your request',
                body
            )
            res.status(200).json({ massage: `The request with the ID ${id} has been ${condition ? 'accepted' : 'rejected'}` });
        }
    );
};

const searchForCaptureRequest = async (req, res) => {
    const { searchType: columnName, searchValue: columnValue, page, limit } = req.query;

    const validSearchType = [
        'id',
        'condition',
        'city',
        'delivery_address',
        'account_number',
        'payment_method',
        'material_type',
        'material_quantity',
        'material_price',
        'total_price',
        'request_id',
        'station_id',
        'company_id',
    ];

    const offset = (page - 1) * limit;

    if (!validSearchType.includes(columnName)) {
        return res.status(400).send('Not this time');
    }

    const query = {
        text: `SELECT * FROM capture_request WHERE ${columnName} = $1 And is_delete = false ORDER BY date ASC LIMIT $2 OFFSET $3`,
        values: [columnValue, limit, offset],
    };

    const queryTotal = {
        text: `SELECT COUNT(*) AS total FROM capture_request WHERE ${columnName} = $1 And is_delete = false`,
        values: [columnValue],
    };

    try {
        const { rows } = await db.query(query);

        const totalItems = await db.query(queryTotal);
        const totalItemCount = totalItems.rows[0].total;
        const totalPages = Math.ceil(totalItemCount / limit); // Calculate total pages

        res.status(200).json({
            items: rows,
            totalItems: totalItemCount,
            totalPages: totalPages,
        });

    } catch (error) {
        console.error('Error executing query:', error);
        res.status(400).json([]);
    }
}

const getCaptureRequests = async (req, res) => {
    const { page, limit } = req.query;

    try {
        // Calculate the offset based on the page and limit
        const offset = (page - 1) * limit;

        // Fetch data from the database using the custom query
        const requests = await db.query(queries.getDashboardCaptureRequest, [limit, offset]);

        // Get the total number of items in the database
        const totalItems = await db.query('SELECT COUNT(*) AS total FROM capture_request WHERE is_delete = false');

        const totalItemCount = totalItems.rows[0].total;
        const totalPages = Math.ceil(totalItemCount / limit); // Calculate total pages

        // Send the response with data and totalItems
        res.json({
            items: requests.rows,
            totalItems: totalItems.totalItemCount,
            totalPages: totalPages
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteCaptureRequest = async (req, res) => {

    const id = req.params.id;

    db.query(queries.dashboardDeleteCaptureRequest,
        [true, id],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            res.status(200).json({ massage: `Request with ID: ${id} deleted` });
        }
    );
};

const changeConditionCaptureRequest = async (req, res) => {

    const { condition, id } = req.body;

    let captureRequest;
    let company;
    let station;

    try {
        const resultsReq = await db.query(queries.getCaptureRequestById, [id]);
        captureRequest = resultsReq.rows[0];

        const resultsCom = await db.query(queries.getCompanyById, [captureRequest.company_id]);
        const resultsSta = await db.query(queries.getStationById, [captureRequest.station_id]);

        company = resultsCom.rows[0];
        station = resultsSta.rows[0];

    } catch (error) {
        return res.status(400).json(error);
    }


    let bodyCompany = acceptStationBody(
        company.username,
        'EcoBridge',
        'www.EcoBridge.com/Login',
        'www.EcoBridge.com',
        `We would like to inform you that the capture request sent by you with ID ${captureRequest.id} has changed its status to ${condition}. You can now log in and follow up on your requests and learn more!`,
        true
    );

    let bodyStation = acceptStationBody(
        station.username,
        'EcoBridge',
        'www.EcoBridge.com/Login',
        'www.EcoBridge.com',
        `We would like to inform you that the capture request sent to you with ID ${captureRequest.id} has changed its status to ${condition}. You can now log in and follow up on your requests and learn more!`,
        true
    );

    db.query(queries.dashboardChangeCondition,
        [condition, id],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            sendEmailFunction(
                company.email,
                'Your request status has been updated',
                bodyCompany
            )
            sendEmailFunction(
                station.email,
                'The status of a request sent to you has been updated',
                bodyStation
            )
            res.status(200).json({ massage: `The capture request with the ID ${id} has been change to ${condition}` });
        }
    );
};

// Main Counters
const countCompanies = async (req, res) => {

    db.query(queries.countCompanies,
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            else {
                res.status(200).json(results.rows[0]);
            }
        });
}

const countStations = async (req, res) => {

    db.query(queries.countStations,
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            else {
                res.status(200).json(results.rows[0]);
            }
        });
}

const countRequests = async (req, res) => {

    db.query(queries.countRequests,
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            else {
                res.status(200).json(results.rows[0]);
            }
        });
}

const countCaptureRequest = async (req, res) => {

    db.query(queries.countCaptureRequest,
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            else {
                res.status(200).json(results.rows[0]);
            }
        });
}

const countCompaniesMovements = async (req, res) => {

    db.query(queries.countCompaniesMovements,
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            else {
                res.status(200).json(results.rows[0]);
            }
        });
}

const countStationsMovements = async (req, res) => {

    db.query(queries.countStationsMovements,
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            else {
                res.status(200).json(results.rows[0]);
            }
        });
}

const companyInfoQuery = async (req, res) => {

    db.query(queries.companyInfoQuery,
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            else {
                res.status(200).json(results.rows[0]);
            }
        });
}

const stationInfoQuery = async (req, res) => {

    db.query(queries.stationInfoQuery,
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            else {
                res.status(200).json(results.rows[0]);
            }
        });
}

const requestsInfoQuery = async (req, res) => {

    db.query(queries.requestsInfoQuery,
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            else {
                res.status(200).json(results.rows[0]);
            }
        });
}

const companyMovementsInfoQuery = async (req, res) => {

    db.query(queries.companyMovementsInfoQuery,
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            else {
                res.status(200).json(results.rows[0]);
            }
        });
}

const stationMovementsInfoQuery = async (req, res) => {

    db.query(queries.stationMovementsInfoQuery,
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            else {
                res.status(200).json(results.rows[0]);
            }
        });
}

const captureRequestInfoQuery = async (req, res) => {

    db.query(queries.captureRequestInfoQuery,
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            else {
                res.status(200).json(results.rows[0]);
            }
        });
}

const earningsInfoQuery = async (req, res) => {

    db.query(queries.earningsInfoQuery,
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            else {
                res.status(200).json(results.rows[0]);
            }
        });
}

const allMonthProfit = async (req, res) => {

    db.query(queries.allMonthProfit,
        (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).json(error);
            }
            else {
                res.status(200).json(results.rows);
            }
        });
}

const getTraffic = async (req, res) => {
    const { tableName } = req.query;

    if (!tableName) {
        return res.status(400).json({ message: 'table not found' });
    }

    const currentWeek = getISOWeek(new Date());

    const currentWeekTrafficQuery = `
      SELECT SUM(traffic) AS total_traffic
      FROM traffic_${tableName}
      WHERE date_part('isoyear', date) = date_part('isoyear', CURRENT_DATE)
        AND date_part('week', date) = $1
    `;

    const allWeekTrafficQuery = `SELECT * FROM traffic_${tableName} ORDER BY date ASC`;

    const previousWeekTrafficQuery = `
      SELECT SUM(traffic) AS total_traffic
      FROM traffic_${tableName}
      WHERE date_part('isoyear', date) = date_part('isoyear', CURRENT_DATE)
        AND date_part('week', date) = $1 - 1
    `;

    const [currentWeekTrafficResult, previousWeekTrafficResult, allWeekTrafficResult] = await Promise.all([
        PGP.one(currentWeekTrafficQuery, [currentWeek]),
        PGP.one(previousWeekTrafficQuery, [currentWeek]),
        PGP.many(allWeekTrafficQuery),
    ]);

    const currentWeekTraffic = currentWeekTrafficResult.total_traffic || 0;
    const previousWeekTraffic = previousWeekTrafficResult.total_traffic || 0;

    let percentageChange;
    if (previousWeekTraffic !== 0) {
        percentageChange = ((currentWeekTraffic - previousWeekTraffic) / previousWeekTraffic) * 100;
    } else {
        percentageChange = currentWeekTraffic === 0 ? 0 : Infinity;
    }

    res.status(200).json({
        previousWeekTraffic: previousWeekTrafficResult,
        currentWeekTraffic: currentWeekTrafficResult,
        percentage: percentageChange.toFixed(2),
        allWeekTraffic: allWeekTrafficResult,
    });
};


module.exports = {

    // Profit Ratio
    getProfitRatio,
    setProfitRatio,

    // Companies
    searchForCompany,
    getCompanies,
    deleteCompany,

    // Stations
    searchForStation,
    getStations,
    deleteStation,
    acceptStation,

    // Requests
    searchForRequest,
    getRequests,
    deleteRequest,
    acceptRequest,

    // Capture Request
    searchForCaptureRequest,
    getCaptureRequests,
    deleteCaptureRequest,
    changeConditionCaptureRequest,

    // Main Counts 
    countCompanies,
    countStations,
    countRequests,
    countCaptureRequest,
    countCompaniesMovements,
    countStationsMovements,
    companyInfoQuery,
    stationInfoQuery,
    requestsInfoQuery,
    companyMovementsInfoQuery,
    stationMovementsInfoQuery,
    captureRequestInfoQuery,
    earningsInfoQuery,
    getTraffic,
    allMonthProfit,
}