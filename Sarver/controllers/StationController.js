const { db } = require("../models/connection");
const queries = require("./queries");
const bcrypt = require("bcrypt");

const addStation = async (req, res, next) => {
    const {
        username,
        phone,
        email,
        password,
        businessType,
        address,
        organizationName,
        wasteInfoType,
        wasteInfoRange
    } = req.body;
    const station = await db.query(queries.getStationByEmail, [email]);

    if (station.rows.length != 0) {
        res.status(409).send("User Already Exist.");

    } else {
        const hashedPwd = await bcrypt.hash(password, 10);
        const date = new Date();

        const list_materials_and_prices = wasteInfoType.map((item) => {

            return {
                materialType: item,
                price: '',
                weightUnit: ''
            }
        })

        db.query(queries.addStation,
            [
                "station",
                username,
                phone,
                email,
                hashedPwd,
                businessType,
                address,
                organizationName,
                wasteInfoType,
                wasteInfoRange,
                date,
                list_materials_and_prices
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

const updatePrice = async (req, res, next) => {

    const { list } = req.body;

    const station = req.user;

    db.query(queries.uploadMaterialsAndPrices,
        [
            list,
            station.station_id
        ],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }

            res.status(200).json({ massage: `station  with ID: ${station.station_id} Updated Price successfully`, list: results.rows[0] });
        }
    );
};

const getStationById = async (req, res) => {
    const id = req.params.id;

    db.query(queries.getStationById, [id],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            else {
                res.status(200).json(results.rows);
            }
        });
}

const getAllStation = async (req, res) => {
    db.query(queries.getAllStation,
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            else {
                res.status(200).json(results.rows);
            }
        });
}

const updateStation = async (req, res) => {

    const {
        username,
        phone,
        email,
        password,
        business_type,
        address,
        organization_name,
        waste_info_type,
        waste_info_range
    } = req.body;

    let userData = req.user;

    try {
        if (!(await bcrypt.compare(password, userData.password))) {
            return res.status(400).send("Incorrect password");
        }
    } catch (error) {
        return res.status(400).json(error);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const parsedData = userData.list_materials_and_prices.map((jsonString) => JSON.parse(jsonString));

    // Remove deleted materials from list_materials_and_prices
    const updatedList = parsedData.filter((obj) => waste_info_type.includes(obj.materialType));

    // Add new materials to list_materials_and_prices
    waste_info_type.forEach((materialType) => {
        const existingMaterial = updatedList.find((obj) => obj.materialType === materialType);
        if (!existingMaterial) {
            updatedList.push({
                materialType,
                price: '',
                weightUnit: ''
            });
        }
    });

    const updatedListAsString = updatedList.map((obj) => JSON.stringify(obj));

    await db.query(
        queries.updateStation,
        [username, phone, email, hashPassword, business_type, address, organization_name, waste_info_type, waste_info_range, updatedListAsString, userData.station_id],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            res.status(200).json({ message: `User with ID: ${userData.station_id} updated successfully`, user: results.rows[0] });
        }
    );
};

const changePassword = async (req, res, next) => {
    const id = req.user.station_id;

    const { oldPassword, newPassword, confirmPassword } = req.body;

    let userData;

    try {
        const results = await db.query(queries.getStationById, [id]);
        const userData = results.rows[0];

        if (!userData || userData.is_delete) {
            return res.status(404).send('User not found');
        }

        if (!(await bcrypt.compare(oldPassword, userData.password))) {

            return res.status(400).send("incorrect password");
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).send("Password does not match");
        }
    } catch (error) {
        return res.status(400).json(error);
    }

    const date = new Date()

    const hashPassword = await bcrypt.hash(newPassword, 10);

    await db.query(queries.changeStationPassword,
        [hashPassword, date, id],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            next();
        }
    );
};

const deleteStation = async (req, res) => {
    const id = req.user.station_id;

    const { passwordDeleteAccount } = req.body

    let userData;

    try {
        const results = await db.query(queries.getStationById, [id]);
        const userData = results.rows[0];

        if (!userData || userData.is_delete) {
            return res.status(404).send('User not found');
        }

        if (!(await bcrypt.compare(passwordDeleteAccount, userData.password))) {

            return res.status(400).send("incorrect password");
        }

    } catch (error) {
        return res.status(400).json(error);
    }

    db.query(queries.deleteStation,
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
    addStation,
    getStationById,
    getAllStation,
    updateStation,
    deleteStation,
    changePassword,
    updatePrice,
}