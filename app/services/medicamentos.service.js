const httpStatus = require('http-status');
const _ = require('lodash');
const sequelize = require('../db');


//constantes de modelos
const {medicamentos} = require('../models');
const {removeUnnecessaryItems} = require("@babel/preset-env/lib/filter-items");
const {toJSON} = require("lodash/seq");

const getStatus = (status) => {
    try {
        const row = {
            where: {
                id: status
            },
            order: [['id', 'DESC']]
        };
        return row;
    } catch (error) {
        throw console.log(`${httpStatus.INTERNAL_SERVER_ERROR}, Ah ocurrido un error -> ${error}`)
    }
}

const createMedicamentos = async (medicamentosBody) => {

    let medicamentosData;

    try {
        //validar el body vacio
        if (_.isEmpty(medicamentosBody)) {
            console.log('El cuerpo esta vacio');
            return JSON.stringify({
                code: `${httpStatus.NO_CONTENT}`,
                message: 'Struct JSON empty'
            });
        } else {
            medicamentosData = await medicamentos.create(medicamentosBody)
            return medicamentosData;
        }
    } catch (error) {
        // noinspection JSVoidFunctionReturnValueUsed
        throw console.log(`${httpStatus.BAD_REQUEST}, Ah Ocurrido un Error -> ${error}`);
    }
};

const getMedicamentos = async () => {
    try {
        const getMedic = await medicamentos.findAll();

            return getMedic;

    } catch (error) {
        // noinspection JSVoidFunctionReturnValueUsed
        throw console.log(`CODE: ${httpStatus.NO_CONTENT}, -> error: ${error}`);
    }
};

const getMedicamentosById = async (id) => {
    try {
        const medic = await medicamentos.findOne({
            where: {
                id: id
            }
        });
        if (!_.isEmpty(medicamentos)) {
            return medic;
        }

    } catch (error) {
        return
        // noinspection UnreachableCodeJS
        JSON.stringify({
            code: `${httpStatus.NO_CONTENT}`,
            message: error
        });
        // noinspection JSVoidFunctionReturnValueUsed
        throw console.log(`CODE: ${httpStatus.NO_CONTENT}, -> error: ${error}`)
    }
    ;
};


module.exports = {
    createMedicamentos,
    getMedicamentos
}
