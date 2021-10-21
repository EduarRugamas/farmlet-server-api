const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {medicamentosService} = require('../services');
const _ = require('lodash');


const createMedicamento = catchAsync( async (req, res) => {
    const medic = await medicamentosService.createMedicamentos(req.body);

    if (_.isEmpty(medic)){
        res.status(httpStatus.NO_CONTENT).send({
            code: `${httpStatus.NO_CONTENT}`,
            message: 'struct JSON empty'
        });
    }else if (!_.isEmpty(medic)){
        res.status(httpStatus.CREATED).send(medic)
    }
});

const getMedicamentos = catchAsync( async (req, res) => {
    const medic = await medicamentosService.getMedicamentos();
   if (_.isEmpty(medic)){
       res.status(httpStatus.NO_CONTENT).send({
           CODE: `${httpStatus.NO_CONTENT}`,
           message: 'No hay contenido'
       });
   } else {
       res.status(httpStatus.OK).send(medic);
   }
});

module.exports = {
    createMedicamento,
    getMedicamentos

}
