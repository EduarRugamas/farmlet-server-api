const express = require('express');
const {medicamentosController} = require('../controllers');

const router = express.Router();

router
    .route('/create')
    .post(medicamentosController.createMedicamento);

router
    .route('/')
    .get(medicamentosController.getMedicamentos);





module.exports = router
