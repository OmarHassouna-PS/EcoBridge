const { db } = require("../models/connection");
const queries = require("./queries");

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
module.exports = {
    getProfitRatio,
}