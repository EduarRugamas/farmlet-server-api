const express = require('express');
const auth = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const userValidation = require('../validations/user.validation');
const userController = require('../controllers/user.controller');


const router = express.Router();

router
    .route('/create/user')
    .post(auth('manageOwnData'),validate(userValidation.createUser), userController.createUser);

router.route('/getUser')
    .get(auth('getUsers'), userController.getUsers);


router.route('/users/:id')
    .get(auth('getUsers'), userController.getUser)
    .patch(auth('manageOwnData'), userController.updateUser)
    .delete(auth('manageUsers'), userController.deleteUser);

module.exports = router;
