const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { User } = require("../models");
const { dataValidator, ExpressError, modelService } = require("../utilities");
const { Op } = require("sequelize");

module.exports.registerUser = async (req, res) => {
    const { error, value } = dataValidator.isValidRegisterUserObject(req.body);
    if (error) throw new ExpressError(400, error.details[0].message);

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(value.password, salt);

    const user = await User.create({
        first_name: value.firstName,
        last_name: value.lastName,
        email: value.email,
        password: hashedPassword,
    });

    const accessToken = jwt.sign({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3600s' });

    const refreshToken = jwt.sign({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    res.cookie('refreshToken', refreshToken, { httpOnly: true });

    modelService.successResponse(res, 200, { accessToken }, "User registered successfully");
};

module.exports.loginUser = async (req, res) => {
    const { error, value } = dataValidator.isValidLoginUserObject(req.body);
    if (error) throw new ExpressError(400, error.details[0].message);

    const user = await User.findOne({
        where: {
            [Op.and]: [
                { email: value.email },
                { status: 'active' },
            ]
        }
    });
    if (!user) throw new ExpressError(401, "Invalid credentials");

    const isValidUser = await bcrypt.compare(value.password, user.password);
    if (!isValidUser) throw new ExpressError(401, "Invalid credentials");

    const accessToken = jwt.sign({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3600s' });

    const refreshToken = jwt.sign({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    modelService.successResponse(res, 200, { accessToken }, "User Logged In successfully");
};

module.exports.getAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, user) => {
                if (err) {
                    res.clearCookie("refreshToken");
                    throw new ExpressError(401, "Unauthorized");
                } else {
                    const accessToken = jwt.sign(
                        {
                            id: user.id,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            email: user.email,
                        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "3600s" }
                    );
                    modelService.successResponse(res, 200, { accessToken });
                }
            }
        );
    } else {
        res.clearCookie("refreshToken");
        throw new ExpressError(401, "Unauthorized");
    }

};

module.exports.logout = async (req, res) => {
    res.clearCookie("refreshToken");
    modelService.successResponse(res, 200, null, "Logged out successfully");
};