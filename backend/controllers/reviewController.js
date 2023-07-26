const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { Review, Book, User, Comment } = require("../models");
const { dataValidator, ExpressError, modelService } = require("../utilities");
const { Op } = require("sequelize");

module.exports.addReview = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) throw new ExpressError(404, "Book not found");

    const { error, value } = dataValidator.isValidAddReviewObject({
        ...req.body,
        book_id: id,
        user_id: req.user.id,
    });
    if (error) throw new ExpressError(400, error.details[0].message);

    const review = await Review.create({
        title: value.title,
        rating: value.rating,
        book_id: value.book_id,
        user_id: value.user_id,
    });
    modelService.successResponse(res, 201, {}, "Review added successfully");
};

module.exports.getAllReviews = async (req, res) => {
    const reviews = await Review.findAndCountAll({
        // where: {

        // },
        ...modelService.queryOptions(req),
        include: [
            {
                model: User,
                attributes: ["first_name", "last_name"],
            },
            {
                model: Book,
                attributes: ["title", "author", "image_name", "image_url"],
            },
            {
                model: Comment,
                as: "review_comments",
                include: [
                    {
                        model: User,
                    }
                ]
            }
        ],
    });
    modelService.successResponse(res, 200, reviews, "");
};