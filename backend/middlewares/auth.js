const jwt = require("jsonwebtoken");
const { ExpressError } = require("../utilities");

module.exports.isLoggedIn = async (req, res, next) => {
    try {
        const accessToken = req.headers?.authorization?.split(" ")[1];
        if (accessToken) {
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) {
                    res.clearCookie("refreshToken");
                    throw new ExpressError(401, "Unauthorized");
                } else {
                    req.user = user;
                    next();
                }
            });
        } else {
            res.clearCookie("refreshToken");
            throw new ExpressError(401, "Unauthorized");
        }
    } catch (error) {
        next(error);
    }
};