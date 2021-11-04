const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {promocionesService} = require('../services');
const _ = require('lodash');

    const createPromocion = catchAsync(async (req, res) => {
        const promo = await promocionesService.createPromocion(req.body);

        if (_.isEmpty(req.body)){
            res.status(httpStatus.NOT_FOUND).send(promo)
        }else{
            res.status(httpStatus.CREATED).send(promo);
        }
    });

    const getPromocion = catchAsync( async (req, res) => {
        const promo = await promocionesService.getPromocion();

        if (_.isEmpty(res)){
            res.status(httpStatus.NOT_FOUND).send(promo)
        }else {
            res.status(httpStatus.OK).send(promo);
        }
    });

module.exports = {
    createPromocion,
    getPromocion
}
