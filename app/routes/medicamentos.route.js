const express = require('express');
const {medicamentosController} = require('../controllers');

const router = express.Router();

router
    .route('/create')
    .post(medicamentosController.createMedicamento);





module.exports = router
