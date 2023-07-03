const { db } = require("../models/connection");
const queries = require("./queries");

const addMovement = async (req, res) => {

    const { request_id, station_id } = req.body;

    const company = req.user;

    const date = new Date();

    const isExist = await db.query(queries.isMovementCompanyExist, [request_id, station_id, company.company_id]);

    if(isExist.rows.length > 0) {
        return res.status(406).json({ message: `has already been submitted` });
    }

    db.query(queries.addMovementCompany,
        [
            false,
            date,
            request_id,
            station_id,
            company.company_id
        ],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            res.status(200).json({ message: `The transaction was sent successfully` });
        }
    );
};

const getMovements = async (req, res) => {

    const company = req.user;

    db.query(queries.getMovementCompany, [company.company_id],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            res.status(200).json(results.rows);
        }
    );
};

const getMovementById = async (req, res) => {

    const id = req.params.id;

    const company = req.user;

    db.query(queries.getMovementCompanyById, [company.company_id, id],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            res.status(200).json(results.rows[0]);
        }
    );
};

const updateMovement = async (req, res) => {

    const { condition, id, company_id } = req.body;

    db.query(queries.updateMovementCompany,
        [
            condition,
            id,
            company_id,
        ],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            res.status(200).json({ message: `The animation has been updated successfully` });
        }
    );
};

const deleteMovement = async (req, res) => {

    const id = req.params.id;

    db.query(queries.deleteMovementCompany,
        [
            true,
            id,
            req.user.company_id,
        ],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            res.status(200).json({ message: `The animation has been updated successfully` });
        }
    );
};

module.exports = {
    addMovement,
    getMovements,
    getMovementById,
    updateMovement,
    deleteMovement,
}