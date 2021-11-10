const Joi = require('joi');
const {password} = require('./password.validation');

const register = {
    body: Joi.object().keys({
      email: Joi.string().email().required(),
        password: Joi.string().required().custom(password),
        username: Joi.string().required(),
        role: Joi.string().valid('admin')
    })
};
const login = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
        registrationToken: Joi.string(),
    }),
};

const logout = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
};

const refreshTokens = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
};

module.exports = {
    register,
    login,
    logout,
    refreshTokens
}
