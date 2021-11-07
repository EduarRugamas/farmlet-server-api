const express = require('express');
const {promocionesController} = require('../controllers');

const router = express.Router();

router.route('/create')
    .post(promocionesController.createPromocion);
router.route('/')
    .get(promocionesController.getPromocion);
router.route('/id/:id')
    .get(promocionesController.getPromocionesById);

router.route('/update/:id')
    .patch(promocionesController.updatePromociones);

router.route('/delete/:id')
    .delete(promocionesController.deletePromocion);


module.exports = router;

