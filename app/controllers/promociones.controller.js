const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {promocionesService} = require('../services');
const _ = require('lodash');
const errores = require('../utils/CodeError');

    const createPromocion = catchAsync(async (req, res) => {
        const promo = await promocionesService.createPromocion(req.body);

        if (_.isEmpty(req.body)){
            res.status(httpStatus.NOT_FOUND).send(promo)
        }else{
            res.status(httpStatus.CREATED).send(promo);
        }
    });

    const getPromocion = catchAsync( async (req, res) => {
        const promo = await promocionesService.getPromociones();

        if (_.isEmpty(promo)){
            res.status(httpStatus.NOT_FOUND);
        }else {
            res.status(httpStatus.OK).send(promo);
        }
    });

    const getPromocionesById = catchAsync( async (req, res) => {
       const promo = await promocionesService.getPromocionById(req.params.id);

       if (_.isEmpty(promo)){
           res.status(httpStatus.NO_CONTENT).send(errores.Error404_not_content)
       }else {
           res.status(httpStatus.OK).send(promo)
       }

    });

module.exports = {
    createPromocion,
    getPromocion,
    getPromocionesById
}
