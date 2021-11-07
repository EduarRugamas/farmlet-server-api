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

const getPromociones = async () => {
    try {
        const promo = await promociones.findAll();
        if (_.isEmpty(promo)){
            return error.Error404_not_content;
        }else{
            return promo;
        }
    }catch (e) {
        throw console.log(`Code: ${httpStatus.NOT_FOUND}, Error: -> ${e}`);
    }
};

const getPromocionById = async (ID) => {
  try {
      const promo = await promociones.findOne( {
          where: {
              id: ID
          }
      });
        return promo;
  }  catch (e) {
        throw console.log(`Code: ${httpStatus.NOT_FOUND}, error: -> ${e}`);
  }
};

const updatePromocionesById = async (Id, promoBodyUpdate) => {

    try {

        const toUpdatePromocion = await getPromocionById(Id);
        let precioPromocion = promoBodyUpdate.precio;

        if (!toUpdatePromocion){
            throw console.log(`Code: ${httpStatus.NO_CONTENT}, -> No existe este registro para actualizar`);
        }

        if (_.isString(promoBodyUpdate.precio)){
            precioPromocion = _.toNumber(promoBodyUpdate.precio);
        }

        const promoInformation = {
            nombre: _.isEmpty(promoBodyUpdate.nombre) ? toUpdatePromocion.nombre : promoBodyUpdate.nombre,
            descripcion: _.isEmpty(promoBodyUpdate.descripcion) ? toUpdatePromocion.descripcion : promoBodyUpdate.descripcion,
            precio: !_.isNumber(precioPromocion) ? toUpdatePromocion.precio : precioPromocion,
            imagen: _.isEmpty(promoBodyUpdate.imagen) ? toUpdatePromocion.imagen : promoBodyUpdate.imagen
        };

        await promociones.update(promoInformation, { where: { id: Id } });

        return error.ErrorUpdate

    }catch (e) {
       throw console.log(`No se pudo actualizar el registro Error -> ${e}`)
    }

};

const deletePromocion = async (Id) => {
    try {
        const getPromocion = await getPromocionById(Id);

        if (!getPromocion){
            console.log(`No se encontro el registro`)
            return error.Error404_not_content
        }

        await promociones.destroy( { where: { id:Id } } );
        return error.OK200Delete;

    }catch (e) {
        throw console.log(`Code: ${httpStatus.NO_CONTENT}, Error: -> ${e}`);
    }
};


module.exports = {
    createPromocion,
    getPromociones,
    getPromocionById,
    updatePromocionesById,
    deletePromocion
};
