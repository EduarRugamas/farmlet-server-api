const express = require('express');
const {medicamentosController} = require('../controllers');

const router = express.Router();

router
    .route('/create')
    .post(medicamentosController.createMedicamento);

router
    .route('/')
    .get(medicamentosController.getMedicamentos);

router.route('/id/:id')
    .get(medicamentosController.getMedicamentosByID);

router.route('/update/:id')
    .patch(medicamentosController.updateMedicamentos);





module.exports = router
