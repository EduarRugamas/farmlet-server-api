// noinspection JSVoidFunctionReturnValueUsed

const httpStatus = require('http-status');
const _ = require('lodash');
const sequelize = require('../db');


//constantes de modelos
const {medicamentos} = require('../models');


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
            if (_.isEmpty(getMedic)){
                return error.Error204
            }else {
                return getMedic;
            }
    } catch (error) {
        // noinspection JSVoidFunctionReturnValueUsed
        throw console.log(`CODE: ${httpStatus.NO_CONTENT}, -> error: ${error}`);
    }
};
//obtener por id los medicamentos
const getMedicamentosById = async (id) => {
    try {
        return await medicamentos.findOne({
            where: {
                id: id
            }
        });

    } catch (error) {
        // noinspection JSVoidFunctionReturnValueUsed
        throw console.log(`CODE: ${httpStatus.NO_CONTENT}, -> error: ${error}`)
    }

};

//Update de los medicamentos por id
const updateMedicamento = async (idMedicamentos, bodyMedicamento) => {
    try {
        const toUpdateMedicamento = await getMedicamentos(idMedicamentos);

        if (!toUpdateMedicamento){
            throw console.log(`Code: ${httpStatus.NO_CONTENT}, -> No hay contenido`);
        }

        const medicInformation = {

        }

        const updateMedicamento = await medicamentos.update();

    }catch (error) {

    }
}


module.exports = {
    createMedicamentos,
    getMedicamentos,
    getMedicamentosById,
    updateMedicamento
}
