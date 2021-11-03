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
       res.status(httpStatus.NO_CONTENT).send(medic);
   } else {
       res.status(httpStatus.OK).send(medic);
   }
});

const getMedicamentosByID = catchAsync( async (req, res) => {
    const medic = await medicamentosService.getMedicamentosById(req.params.id);

    if (_.isEmpty(medic)){
        res.status(httpStatus.NO_CONTENT).send(medic);
    }else {
        res.status(httpStatus.OK).send(medic);
    }
});

const updateMedicamentos = catchAsync( async (req, res) => {
    const updateMedic = await medicamentosService.updateMedicamento(req.params.id, req.body);
    res.status(httpStatus.OK).send(updateMedic);
});

const deleteMedicamento = catchAsync( async (req, res) => {
    const deleteMedic = await medicamentosService.deleteMedicamento(req.params.id);

    res.send(deleteMedic)
});

module.exports = {
    createMedicamento,
    getMedicamentos,
    getMedicamentosByID,
    updateMedicamentos,
    deleteMedicamento
}
