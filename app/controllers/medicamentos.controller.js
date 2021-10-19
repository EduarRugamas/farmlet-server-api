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




module.exports = {
    createMedicamento,

}
