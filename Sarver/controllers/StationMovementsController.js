const { db } = require("../models/connection");
const queries = require("./queries");

const addMovement = async (req, res) => {

    const { request_id, company_id } = req.body;

    const station = req.user;

    const date = new Date();

    const isExist = await db.query(queries.isMovementStationExist, [request_id, station.station_id, company_id]);

    if(isExist.rows.length > 0) {
        return res.status(406).json({ message: `has already been submitted` });
    }

    db.query(queries.addMovementStation,
        [
            false,
            date,
            request_id,
            company_id,
            station.station_id
        ],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            res.status(200).json({ message: `The transaction was sent successfully` });
        }
    );
};

const getMovement = async (req, res) => {

    const station = req.user;

    db.query(queries.getMovementStation, [station.station_id],
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

    const station = req.user;

    db.query(queries.getMovementStationById, [station.station_id, id],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            res.status(200).json(results.rows[0]);
        }
    );
};

const updateMovement = async (req, res) => {

    const { condition, id, station_id } = req.body;

    db.query(queries.updateMovementStation,
        [
            condition,
            id,
            station_id,
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

    const movement_id = req.params.id;

    console.log(movement_id, req.user.station_id)
    db.query(queries.deleteMovementStation,
        [
            true,
            movement_id,
            req.user.station_id,
        ],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            res.status(200).json({ message: `The animation has been updated successfully` });
        }
    );
};

const rejectMovement = async (req, res) => {

    const movement_id = req.params.id;

    db.query(queries.rejectCompanyMovements,
        [
            true,
            movement_id,
            req.user.station_id,
        ],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            res.status(200).json({ message: `The request was successfully rejected` });
        }
    );
};

const getMovementsCompanyForStation = async (req, res) => {

    const station = req.user;

    db.query(queries.getMovementCompanyForStation, [station.station_id],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            res.status(200).json(results.rows);
        }
    );
};

const acceptMovement = async (req, res) => {

    const { company_id, movement_id, } = req.body;

    const station = req.user;

    db.query(queries.updateMovementCompany, [true, movement_id, company_id, station.station_id],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            res.status(200).json({message : 'The request has been successfully accepted'});
        }
    );
};

module.exports = {
    addMovement,
    getMovement,
    getMovementById,
    updateMovement,
    deleteMovement,
    getMovementsCompanyForStation,
    acceptMovement,
    rejectMovement,
}