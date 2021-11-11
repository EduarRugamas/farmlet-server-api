const httpStatus = require('http-status');
const tokenService = require('./token.service')
const userService = require('./user.service');
const notificationService = require('./notification.service');
const { token } = require('../models');
const CodesError = require('../utils/CodesError');


const loginUserWithEmailAndPassword = async (email, password, Token) => {
  const user  = await userService.getUserByEmail(email);
    if (!user || !(await user.isPasswordMatch(password))){
        throw new CodesError(httpStatus.UNAUTHORIZED, 'Correo o Contrasena Incorrectos');
    }
    if (Token){
        notificationService.refreshToken(user.id, Token);
    }

    return user;
};

const logout = async (refreshToken) => {
    const refreshTokenDoc = await token.findOne({where: { token: refreshToken, type:'refresh', blacklisted: false }});

    if (!refreshTokenDoc) {
        throw new CodesError(httpStatus.NOT_FOUND, 'Sin Contenido')
    }

    await refreshTokenDoc.destroy({ where: { user:refreshTokenDoc.user } });

};


const refreshAuth = async (refreshToken) => {

    try {
        const refreshTokenDoc = await tokenService.verifyToken(refreshToken, 'refresh');
        const user = await userService.getUserById(refreshTokenDoc.id);
        if (!user){
            throw new Error();
        }
        await refreshTokenDoc.destroy();
        return tokenService.generateAuthTokens(user);
    }catch (e) {
        throw new CodesError(httpStatus.UNAUTHORIZED, 'Por favor Autenticate');
    }

};

module.exports = {
    loginUserWithEmailAndPassword,
    logout,
    refreshAuth
}
