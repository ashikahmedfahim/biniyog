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