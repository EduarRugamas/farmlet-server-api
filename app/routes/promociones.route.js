const express = require('express');
const {promocionesController} = require('../controllers');

const router = express.Router();

router.route('/create')
    .post(promocionesController.createPromocion);
router.route('/')
    .get(promocionesController.getPromocion);


module.exports = router;

