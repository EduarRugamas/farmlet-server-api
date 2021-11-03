const express = require('express');
const medicamentosRoute = require('./medicamentos.route');

const router = express.Router();

//definir rutas de la api

router.use('/medicamentos', medicamentosRoute);
//ROUTAS
//router.use('/promociones', promociones.route);
//router.use('/auth', auth.route)

module.exports = router;
