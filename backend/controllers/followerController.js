const { User } = require("../models");
const { dataValidator, ExpressError, modelService } = require("../utilities");
const { Op } = require("sequelize");

module.exports.getFollowAbleUsers = async (req, res) => {
    const user = await User.findByPk(req.user.id);
    const followedUser = await user.getUser_followed({
        attributes: ['id']
    });
    const followedUserIds = followedUser.map(user => user.id);
    followedUserIds.push(req.user.id);
    const followAbleUser = await User.findAll({
        where: {
            id: { [Op.notIn]: followedUserIds },
        },
        attributes: ['id', 'first_name', 'last_name', 'email'],
    });
    modelService.successResponse(res, 200, followAbleUser, "");
};
module.exports.followUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(req.user.id);
    user.addUser_followed(id);
    modelService.successResponse(res, 200, {}, "User followed successfully");
};
module.exports.unfollowUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(req.user.id);
    user.removeUser_followed(id);
    modelService.successResponse(res, 200, {}, "User unfollowed successfully");
};

module.exports.getFollowedUsers = async (req, res) => {
    const user = await User.findByPk(req.user.id);
    const followedUser = await user.getUser_followed();
    modelService.successResponse(res, 200, followedUser, "");
};