const { Comment, User } = require("../models");
const { modelService } = require("../utilities");

module.exports.addComment = async (req, res) => {
    const { id } = req.params;
    await Comment.create({
        title: req.body.title,
        review_id: id,
        user_id: req.user.id,
    });
    modelService.successResponse(res, 200, {}, "Comment added successfully");
};

module.exports.getComments = async (req, res) => {
    const { id } = req.params;
    const comments = await Comment.findAll({
        where: {
            review_id: id,
        },
        include: [
            {
                model: User,
                attributes: ['id', 'first_name', 'last_name'],
            }
        ],
        order: [
            ['id', 'DESC'],
        ],
    });
    modelService.successResponse(res, 200, comments, "");
};