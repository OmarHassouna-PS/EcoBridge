const { db } = require("../models/connection");
const queries = require("./queries");

// For Companies
const addRequest = async (req, res, next) => {

    const { request } = req.body;
    const user = req.user;

    const arrayImages = req.files.map((image) => [image.buffer]);

    const date = new Date();

    db.query(queries.addRequest,
        [
            request.title,
            request.material_type,
            request.condition,
            request.location,
            user.organization_name,
            request.additional_info,
            request.quantity,
            arrayImages,
            user.company_id,
            date
        ],
        (error, results) => {
            if (error) {
                console.log(error)
                return res.status(400).json(error);
            }
            res.json({ message: `Request added successfully for user with ID ${user.company_id}` });
        }
    );
};

const updateRequest = async (req, res, next) => {

    const { request } = req.body;
    const user = req.user;

    db.query(queries.updateRequest,
        [
            request.title,
            request.material_type,
            request.condition,
            request.location,
            user.organization_name,
            request.additional_info,
            request.quantity,
            request.requests_id,
            user.company_id
        ],
        (error, results) => {
            if (error) {
                console.log(error)
                return res.status(400).json(error);
            }
            res.json({ message: `Request updated successfully for user with ID ${user.company_id}` });
        }
    );
};

const getRequests = async (req, res) => {

    const user = req.user;


    db.query(queries.getAllRequestsByCompanyId, [user.company_id],
        (error, results) => {
            if (error) {
                console.log(error)
                return res.status(400).json(error);
            }
            res.json(results.rows);
        }
    );
};

const getRequest = async (req, res) => {
    const id = req.params.id; 

    db.query(queries.getRequestByIdToCompany, [id, req.user.company_id],
        (error, results) => {
            if (error) {
                console.log(error)
                return res.status(400).json(error);
            }
            res.json(results.rows);
        }
    );
};

const deleteRequest = async (req, res) => {
    const id = req.params.id; 

    db.query(queries.deleteRequest, [true, id, req.user.company_id],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            res.json({ message: `Request with id ${id} deleted successfully`});
        }
    );
};

// For Stations

const getAllRequest = async (req, res) => {

    const user = req.user;


    db.query(queries.getAllRequests,
        (error, results) => {
            if (error) {
                console.log(error)
                return res.status(400).json(error);
            }
            res.json(results.rows);
        }
    );
};

const getRequestByID = async (req, res) => {
    const id = req.params.id; 

    db.query(queries.getRequestById, [id],
        (error, results) => {
            if (error) {
                console.log(error)
                return res.status(400).json(error);
            }
            res.json(results.rows);
        }
    );
};
module.exports = {
    addRequest,
    getRequests,
    getRequest,
    deleteRequest,
    updateRequest,

    getAllRequest,
    getRequestByID,
}