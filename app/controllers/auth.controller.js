const httpStatus = require('http-status');
const _ = require('lodash');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService } = require('../services');

const register = catchAsync( async (req, res) => {
   const user = await userService.createUser(req.body);
   const tokens = await tokenService.generateAuthTokens(user);
   res.status(httpStatus.CREATED).send( {user, tokens} );
});

const login = catchAsync( async (req, res) => {

    const { email, password, registrationToken } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password, registrationToken);

    const tokens = await tokenService.generateAuthTokens(user);

    const userData = _.omit(user.dataValues, 'password');
    const result = { user: userData, token: tokens };

    res.send(result);

});

const logout = catchAsync( async (req, res) => {
   await authService.logout(req.body.refreshToken);
   res.status(httpStatus.NO_CONTENT).send();
});

const refreshToken = catchAsync(  async (req, res) => {
   const tokens = await authService.refreshAuth(req.body.refreshToken);
   res.send({ ...tokens });
});

module.exports = {
    register,
    login,
    logout,
    refreshToken
};
