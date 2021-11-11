const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const config = require('../config/config');
const userService = require('./user.service');
const error = require('../utils/CodeError');
const { token } = require('../models');

const generateToken =  ( Id, expires, secret=config.jwt.secret ) => {
    const payload = {
        sub: Id,
        iat: moment().unix(),
        exp: expires.unix()
    }
    return jwt.sign(payload, secret);
};


const saveToken = async (Token, Id, expire, type, blacklisted) => {
    const tokenDoc = await  token.create({
        Token,
        user: Id,
        expires: expire.toDate(),
        type,
        blacklisted
    });
    return tokenDoc;
};

const verifyToken = async ( Token, type ) => {
    const payload = jwt.verify(token, config.jwt.secret);
    const tokenDoc = await token.findOne({where: {  Token, type, user: payload.sub, blacklisted: false  } });
    if (!tokenDoc){
        console.log('Token no encontrado');
        return error.Error400Token;
    }

    return tokenDoc;
};

const generateAuthTokens = async (user) => {

    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = generateToken(user.id, accessTokenExpires);

    const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
    const refreshToken = generateToken(user.id, refreshTokenExpires );

    await saveToken(refreshToken, user.id, refreshTokenExpires, 'refresh');

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate()
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate()
        }
    };
};


const generateResetPasswordToken = async (email) => {
  const user = await userService.getUserByEmail(email);

  if (!user) {
      console.log('user not found with this email');
      return error.Error400TokenEmail;
  }

  const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
  const resetPasswordToken = generateToken(user.id, expires);

  await saveToken(resetPasswordToken, user.id, expires, 'resetpassword');

  return resetPasswordToken;
};

module.exports = {
    generateToken,
    saveToken,
    verifyToken,
    generateAuthTokens,
    generateResetPasswordToken
}



