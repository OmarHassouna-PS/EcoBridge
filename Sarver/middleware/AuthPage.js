const authPage = (permissions) => {
    return (req, res, next) => {
        
        if (Array.isArray(permissions) && permissions.includes(req.user.role)) {
            next();
        }
        else {
            return res.status(401).json("You don't have permission");
        }
    }
}

module.exports = {
    authPage,
}