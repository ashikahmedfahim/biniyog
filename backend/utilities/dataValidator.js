const Joi = require("joi");

module.exports.isValidRegisterUserObject = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    const { error, value } = schema.validate(data);
    return { error, value };
};

module.exports.isValidLoginUserObject = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    const { error, value } = schema.validate(data);
    return { error, value };
};

module.exports.isValidCreateBookObject = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        image: Joi.any().required(),
    });
    const { error, value } = schema.validate(data);
    return { error, value };
};

module.exports.isValidAddReviewObject = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        rating: Joi.number().integer().min(0).max(5).required(),
        book_id: Joi.number().integer().required(),
        user_id: Joi.number().integer().required(),
    });
    const { error, value } = schema.validate(data);
    return { error, value };
};