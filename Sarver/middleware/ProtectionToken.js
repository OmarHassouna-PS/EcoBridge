
const { db } = require("../models/connection");
const queries = require("../controllers/queries");
const jwt = require("jsonwebtoken");

const getUserById = async (userId, query) => {
    try {
        const results = await db.query(query, [userId]);
        return results.rows[0];
    } catch (error) {
        return false;
    }
};

async function ProtectionToken(req, res, next) {
    const authHeader = req.headers.authorization;

    // 1) Check if token exist, if exist get
    const token = authHeader && authHeader.split(" ")[1];
    let decodedToken;

    if (!token) {
        return res.status(401).json({ error: "You must be logged" });
    }

    //  2)Verify token (no change happens, expired token)
    try {
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        decodedToken = decoded;
        
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token", error: error });
    }

    let currentUser;

    const roleQueryMap = {
        admin: queries.getAdminById,
        station: queries.getStationById,
        company: queries.getCompanyById,
    };

    const queryFunction = roleQueryMap[decodedToken?.role];

    // 3) Check if user exists
    if (!queryFunction) {
        return res.status(404).json({ error: 'user not exist!' });
    }

    try {
        currentUser = await getUserById(decodedToken.user_id, queryFunction);

    } catch (error) {
        console.error(error);
    }

    if (!currentUser) {
        return res.status(401).json({ error: 'The user that belong to this token does no longer exist' });
    }

    // 4) Check if user change his password after token created
    if (currentUser.password_changed_at) {
        const passChangedTimestamp = parseInt(
            currentUser.password_changed_at.getTime() / 1000,
            10
        );
        
        // Password changed after token created (Error)
        if (passChangedTimestamp > decodedToken.iat) {
            return res.status(401).json({ error: 'User recently changed his password. please login again' });
        }
    }

    req.user = currentUser;
    next();
}

module.exports = {
    ProtectionToken
};