const { db } = require("../models/connection");
const queries = require("./queries");

const getGeneralStats = async (req, res) => {


    try {

        const countCaptureRequest = await db.query(queries.countCaptureRequest);
        const countAmountWaste = await db.query(queries.countAmountWaste);

        res.json({
            countCaptureRequest: countCaptureRequest.rows[0],
            countAmountWaste: countAmountWaste.rows[0],
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getGeneralStats
}