// noinspection JSVoidFunctionReturnValueUsed

const httpStatus = require('http-status');
const _ = require('lodash');
const sequelize = require('../db');
const error = require('../utils/CodeError');

const {promociones} = require('../models');

const createPromocion = async (promocionBody) => {
    try {
        if (_.isEmpty(promocionBody)) {
            return error.Error404_notFound
        }else {
            await promociones.create(promocionBody);
            return error.Ok200;
        }
    }catch (e) {
        throw console.log(`Code: ${httpStatus.NOT_FOUND}, Error: -> ${e}`);
    }
};

const getPromocion = async () => {
    try {
        const promo = await promociones.findAll();
        if (_.isEmpty(promo)){
            return error.Error404_notFound;
        }else{
            return promo;
        }
    }catch (e) {
        throw console.log(`Code: ${httpStatus.NOT_FOUND}, Error: -> ${e}`);
    }
};

module.exports = {
    createPromocion,
    getPromocion
};
