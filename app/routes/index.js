const express = require('express');
const medicamentosRoute = require('./medicamentos.route');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const promocionesRoute = require('./promociones.route');

const router = express.Router();

//definir rutas de la api

router.use('/medicamentos', medicamentosRoute);
router.use('/promociones', promocionesRoute);
//ROUTAS
//router.use('/promociones', promociones.route);
router.use('/user', userRoute);
router.use('/auth', authRoute);

module.exports = router;
