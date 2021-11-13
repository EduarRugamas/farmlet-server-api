const express = require('express');
const auth = require('../middlewares/auth.middleware');
const {medicamentosController} = require('../controllers');

const router = express.Router();

router
    .route('/create')
    .post(auth('manageOwnData'), medicamentosController.createMedicamento);

router
    .route('/')
    .get(medicamentosController.getMedicamentos);

router.route('/id/:id')
    .get(medicamentosController.getMedicamentosByID);

router.route('/update/:id')
    .patch(auth('manageOwnData'), medicamentosController.updateMedicamentos);

router.route('/delete/:id')
    .delete(auth('manageMedicamentos'), medicamentosController.deleteMedicamento)



module.exports = router
