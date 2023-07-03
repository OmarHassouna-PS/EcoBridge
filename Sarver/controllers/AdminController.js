const { db } = require("../models/connection");
const queries = require("./queries");
const bcrypt = require("bcrypt");

const addAdmin = async (req, res) => {
    const {
        username,
        phone,
        email,
        password,
        address
    } = req.body;
    const date = new Date()

    const companies = await db.query(queries.getAdminByEmail, [email]);

    if (companies.rows.length != 0) {
        res.status(409).send("admin Already Exist.");

    } else {
        const hashedPwd = await bcrypt.hash(password, 10);
        db.query(queries.addAdmin,
            [
                "admin",
                username,
                phone,
                email,
                hashedPwd,
                address,
                date
            ],
            (error, results) => {
                if (error) {
                    return res.status(400).json(error);
                }
                req.user = results?.rows[0];
                next();
            }
        );
    }
};

const getAdminById = async (req, res) => {
    const id = req.params.id;

    db.query(queries.getAdminById, [id],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            else {
                res.status(200).json(results.rows);
            }
        });
}

const getAllAdmin = async (req, res) => {
    db.query(queries.getAllAdmin,
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            else {
                res.status(200).json(results.rows);
            }
        });
}

const updateAdmin = async (req, res) => {
    const id = parseInt(req.params.id);
    const { username, phone, email, password, address } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    db.query(queries.updateAdmin,
        [username, phone, email, hashPassword, address, id],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            res.status(200).json({ massage: `user  with ID: ${id} Updated successfully`, user: results.rows[0] });
        }
    );
};

const deleteAdmin = (req, res) => {
    const id = parseInt(req.params.id);

    db.query(queries.deleteAdmin,
        [true, id],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            res.status(200).json({ massage: `User with ID: ${id} deleted`, user: results.rows[0] });
        }
    );
};

module.exports = {
    addAdmin,
    getAdminById,
    updateAdmin,
    getAllAdmin,
    deleteAdmin,
}