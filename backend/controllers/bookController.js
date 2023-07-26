const { Book } = require("../models");
const { dataValidator, ExpressError, modelService } = require("../utilities");
const { Op } = require("sequelize");

module.exports.createBook = async (req, res) => {
    const { error, value } = dataValidator.isValidCreateBookObject({
        ...req.body,
        image: req.file,
    });
    if (error) throw new ExpressError(400, error.details[0].message);

    await Book.create({
        title: value.title,
        author: value.author,
        image_name: value.image.filename,
    });

    modelService.successResponse(res, 200, {}, "Book created successfully");
};

module.exports.getAllBooks = async (req, res) => {
    const books = await Book.findAll({
        where: {
            status: 'active',
        },
        attributes: ['id', 'title', 'author'],
    });

    modelService.successResponse(res, 200, books, "");
};
