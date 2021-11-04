// noinspection JSVoidFunctionReturnValueUsed

const httpStatus = require('http-status');
const _ = require('lodash');
const sequelize = require('../db');
const error = require('../utils/CodeError');


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
const updateMedicamento = async (idMedicamentos, bodyMedicamentoUpdate) => {
    try {
        const toUpdateMedicamento = await getMedicamentosById(idMedicamentos);
        let precioMedicamento = bodyMedicamentoUpdate.precio

        if (!toUpdateMedicamento){
            throw console.log(`Code: ${httpStatus.NO_CONTENT}, -> No hay existe este registro para actualizar`);
        }

        if (_.isString(bodyMedicamentoUpdate.precio)){
            precioMedicamento = _.toNumber(bodyMedicamentoUpdate.precio);
        }

        const medicInformation = {
            nombre: _.isEmpty(bodyMedicamentoUpdate.nombre) ? toUpdateMedicamento.nombre : bodyMedicamentoUpdate.nombre,
            descripcion: _.isEmpty(bodyMedicamentoUpdate.descripcion) ? toUpdateMedicamento.descripcion : bodyMedicamentoUpdate.descripcion,
            precio: !_.isNumber(precioMedicamento) ? toUpdateMedicamento.precio: precioMedicamento,
            imagen: _.isEmpty(bodyMedicamentoUpdate.imagen) ? toUpdateMedicamento.imagen : bodyMedicamentoUpdate.imagen
        }

        await medicamentos.update(medicInformation, {where: {id: idMedicamentos}  });

        return getMedicamentosById(idMedicamentos);

    }catch (error) {
        console.log(`No se pudo actualizar el registro Error -> ${error}`)
    }
}

const deleteMedicamento = async (idMedicamento) => {
    try {
        const getMedicamentos = await getMedicamentosById(idMedicamento)

        if (!getMedicamentos){
            throw console.log(`Code: ${httpStatus.NO_CONTENT}, Error no se encontro el registro`);
        }

         await medicamentos.destroy({ where: { id:idMedicamento } } );

        return error.OK200Delete

    }catch (e) {
        console.log(`Code: ${httpStatus.NOT_FOUND}, Error -> ${e}`)
        return error.Error_delete
    }
}


module.exports = {
    createMedicamentos,
    getMedicamentos,
    getMedicamentosById,
    updateMedicamento,
    deleteMedicamento
}
