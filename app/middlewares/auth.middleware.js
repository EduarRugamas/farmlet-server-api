const passport = require('passport');
const httpStatus = require('http-status');
const CodesError = require('../utils/CodesError');
const { roleRights } = require('../config/roles');
const { token } = require('../models');



const verifyCallBack = (req, resolve, reject, requiredRights, strictAuth) => async (err, user, info) => {

    if (err || info || !user){
        console.log("Error aqui")
        return reject(new CodesError(httpStatus.UNAUTHORIZED, 'Por favor Autenticate'));
    }
    req.user = user;

    if (strictAuth) {
        const refreshToken = await token.findOne({ where:{ user: user.id } } );
        if (!refreshToken){
            return reject(new CodesError(httpStatus.UNAUTHORIZED, 'Por favor Autenticate'));
        }
    }

    if (requiredRights.length) {
        const userRights = roleRights.get(user.role);
        const hasRequiredRights = requiredRights.every( (requiredRights) => userRights.includes(requiredRights) );
        if (!hasRequiredRights && req.params.userId !== user.id){

            return reject(new CodesError(httpStatus.FORBIDDEN, 'Forbidden'))
        }
    }
   resolve()
};

const auth = (...requiredRights) => async (req, res, next, strictAuth= true) => {

    return new Promise( (resolve, reject) => {
       passport.authenticate('jwt', { session: false }, verifyCallBack(req, resolve, reject, requiredRights, strictAuth))(
         req,
         res,
         next
       );
    })
        .then( () => next() )
        .catch((err)=> next(err));
};

module.exports = auth;

