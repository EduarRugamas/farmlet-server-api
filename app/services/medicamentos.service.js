const httpStatus = require('http-status');
const _ = require('lodash');
const sequelize = require('../db');


//constantes de modelos
const { medicamentos } = require('../models');


const getStatus = (status) =>{
    try {
        const row = {
            where: {
                id: status
            },
            order: [['id', 'DESC']]
        };
        return row;
    }catch (error) {
        throw console.log(`${httpStatus.INTERNAL_SERVER_ERROR}, Ah ocurrido un error -> ${error}`)
    }
}


const createMedicamentos = async (medicamentosBody) => {


    let medicamentosData;

    try {
        //validar el body vacio
        if ( _.isEmpty(medicamentosBody) ){
            console.log('El cuerpo esta vacio');
            return JSON.stringify({
                code: `${httpStatus.NO_CONTENT}`,
                message: 'Struct JSON empty 204'
            });
        }else {
            medicamentosData = await medicamentos.create(medicamentosBody)
            return medicamentosData;
        }
    }catch (error) {
        throw console.log(`${httpStatus.BAD_REQUEST}, Ah Ocurrido un Error -> ${error}`);
    }

};

module.exports = {
    createMedicamentos,
}
