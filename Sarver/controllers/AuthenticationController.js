const { db } = require("../models/connection");
const queries = require("./queries");
const bcrypt = require("bcrypt");

const checkStation = (req, res, next) => {
    const { email, password } = req.body;

    db.query(
        queries.checkStation, [email],
        async (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }

            const user = results.rows[0];

            if (!user.active) {
                res.status(401).send("Don't have access");
            }
            else if (!user || !(await bcrypt.compare(password, user.password))) {

                res.status(401).send("incorrect email or password");
            }
            else {
                req.user = user;
                next();
            }
        }
    );
};

const checkCompany = (req, res, next) => {
    const { email, password } = req.body;

    db.query(
        queries.checkCompany, [email],
        async (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }

            const user = results.rows[0];

            if (!user || !(await bcrypt.compare(password, user.password))) {

                return res.status(401).send("incorrect email or password");
            }
            else {
                req.user = user;
                next();
            }
        }
    );
};

const checkAdmin = (req, res, next) => {
    const { email, password } = req.body;
    db.query(
        queries.checkAdmin, [email],
        async (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }

            const user = results.rows[0];

            if (!user || !(await bcrypt.compare(password, user.password))) {

                res.status(401).send("incorrect email or password");
            }
            else {
                req.user = user;
                next();
            }
        }
    );
};

module.exports = {
    checkStation,
    checkCompany,
    checkAdmin,
}
