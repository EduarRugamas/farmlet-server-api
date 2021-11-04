const express = require('express');
const medicamentosRoute = require('./medicamentos.route');
const promocionesRoute = require('./promociones.route');

const router = express.Router();

//definir rutas de la api

router.use('/medicamentos', medicamentosRoute);
router.use('/promociones', promocionesRoute);
//ROUTAS
//router.use('/promociones', promociones.route);
//router.use('/auth', auth.route)

module.exports = router;
