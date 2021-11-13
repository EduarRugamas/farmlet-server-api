const Joi = require('joi');
const { password } = require('./password.validation');

const createUser = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        username: Joi.string().required(),
        role: Joi.string().required().valid('user', 'admin'),
    }),
};

const getUsers = {
    query: Joi.object().keys({
        username: Joi.string(),
        role: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getUser = {
    params: Joi.object().keys({
        userId: Joi.number().integer().required(),
    }),
};

const updateUser = {
    params: Joi.object().keys({
        userId: Joi.number().integer().required(),
    }),
    body: Joi.object()
        .keys({
            email: Joi.string().email(),
            username: Joi.string(),
            password: Joi.string().custom(password),
        })
        .min(1),
};

const deleteUser = {
    params: Joi.object().keys({
        userId: Joi.number().integer().required(),
    }),
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
};
