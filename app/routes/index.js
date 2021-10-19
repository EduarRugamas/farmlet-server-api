const express = require('express');
const medicamentosRoute = require('./medicamentos.route');

const router = express.Router();

//definir rutas de la api

router.use('/medicamentos', medicamentosRoute);

module.exports = router;
