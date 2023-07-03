const { db } = require("../models/connection");
const queries = require("./queries");


const updateUserAvatar = async (req, res) => {
    const user = req.user;
    const info = user.role === 'company' ? {query : queries.uploadImageCompany, id : user.company_id} : {query : queries.uploadImageStation, id : user.station_id};

    try {
        
        await db.query(info.query, [req.file.buffer, info.id]);

        res.json({ message: `Image uploaded successfully for user with ID ${info.id}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
};

const getUserAvatar = async (req, res) => {
    const user = req.user;
    const info = user.role === 'company' ? {query : queries.getCompanyAvatar, id : user.company_id} : {query : queries.getStationAvatar, id : user.station_id};

    try {
        const result = await db.query(info.query, [info.id]);
        const imageData = result.rows[0].avatar_image;

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve image' });
    }
};

module.exports = {
    updateUserAvatar,
    getUserAvatar,

}