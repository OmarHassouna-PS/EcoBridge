const { db } = require("../models/connection");
const queries = require("./queries");

const getCaptureRequest = async (req, res, next) => {

    const movementId = req.params.movementId;
    const company = req.user;

    const movement = await db.query(queries.getMovementCompanyById, [company.company_id, movementId]);

    if (!movement.rows[0]?.condition || movement.rows[0]?.is_reject) {
        return res.status(406).json({ message: 'The request is incomplete or rejected!' });
    }

    const request = await db.query(queries.getRequestByIdToCompany, [movement.rows[0].request_id, company.company_id]);
    const station = await db.query(queries.getStationById, [movement.rows[0].station_id]);

    if (!movement || !request || !station) return res.status(406).json({ message: "Something went wrong, please try again later" });

    const parsedData = station.rows[0].list_materials_and_prices.map((jsonString) => JSON.parse(jsonString));

    const materialPrice = parsedData.find((item) => item.materialType === request.rows[0].material_type);

    if (!materialPrice) {
        return res.status(406).json({ message: 'It seems that the station is no longer receiving the material of this request. Please apply to other stations!' });
    }

    const getProfitInfo = await db.query(queries.getProfitInfo);

    const priceAfterProfitRateDeduction = Number(materialPrice.price) - (getProfitInfo.rows[0].profit_percentage * Number(materialPrice.price));

    res.status(200).json({
        material_type: request.rows[0].material_type,
        material_quantity: request.rows[0].quantity,
        material_price: priceAfterProfitRateDeduction,
        total_price: priceAfterProfitRateDeduction * Number(request.rows[0].quantity),
    })
};

const getCaptureRequestsCompany = async (req, res, next) => {

    const company = req.user;

    db.query(queries.getAllCaptureRequestCompany, [company.company_id],
        (error, results) => {
            if (error) {
                console.log(error)
                return res.status(400).json(error);
            }
            return res.status(200).json(results.rows);

        }
    );
};

const getCaptureRequestsStation = async (req, res, next) => {

    const station = req.user;

    db.query(queries.getAllCaptureRequestStation, [station.station_id],
        (error, results) => {
            if (error) {
                console.log(error)
                return res.status(400).json(error);
            }
            return res.status(200).json(results.rows);

        }
    );
};

const addCaptureRequest = async (req, res, next) => {

    const { city, delivery_address, delivery_date, delivery_time, Account_number, payment_method, movement_id } = req.body;

    const company = req.user;

    const movement = await db.query(queries.getMovementCompanyById, [company.company_id, movement_id]);

    if (!movement.rows[0].condition || movement.rows[0].is_reject) {
        return res.status(406).json({ message: 'The request is incomplete or rejected!' });
    }
    const isCaptureRequestExist = await db.query(queries.isCaptureRequestExist, [movement.rows[0].request_id, movement.rows[0].station_id, company.company_id]);

    if (isCaptureRequestExist.rows.length > 0) return res.status(406).json({ message: 'A capture request has already been submitted on this request!' });

    const request = await db.query(queries.getRequestByIdToCompany, [movement.rows[0].request_id, company.company_id]);
    const station = await db.query(queries.getStationById, [movement.rows[0].station_id]);


    if (!movement || !request || !station) return res.status(406).json({ message: "Something went wrong, please try again later" });

    const parsedData = station.rows[0].list_materials_and_prices.map((jsonString) => JSON.parse(jsonString));

    const materialPrice = parsedData.find((item) => item.materialType === request.rows[0].material_type);

    if (!materialPrice) {
        return res.status(406).json({ message: 'It seems that the station is no longer receiving the material of this request. Please apply to other stations!' });
    }


    await db.query(queries.changeActiveCompanyMovements, [false, movement.rows[0].request_id, company.company_id, movement.rows[0].station_id]);
    await db.query(queries.changeActiveStationMovements, [false, movement.rows[0].request_id, company.company_id, movement.rows[0].station_id]);


    const getProfitInfo = await db.query(queries.getProfitInfo);

    const priceAfterProfitRateDeduction = Number(materialPrice.price) - (getProfitInfo.rows[0].profit_percentage * Number(materialPrice.price));

    const total_price = priceAfterProfitRateDeduction * Number(request.rows[0].quantity);

    const date = new Date();

    db.query(queries.addCaptureRequest,
        [
            "Underway",
            date,
            city,
            delivery_address,
            delivery_date,
            delivery_time,
            Account_number,
            payment_method,
            request.rows[0].material_type,
            request.rows[0].quantity,
            priceAfterProfitRateDeduction,
            total_price,
            getProfitInfo.rows[0].profit_percentage,
            movement.rows[0].request_id,
            company.company_id,
            movement.rows[0].station_id
        ],
        (error, results) => {
            if (error) {
                console.log(error)
                return res.status(400).json(error);
            }
            return res.status(200).json({ message: 'The capture request has been sent successfully' });

        }
    );
}

module.exports = {
    getCaptureRequest,
    addCaptureRequest,
    getCaptureRequestsCompany,
    getCaptureRequestsStation,

}