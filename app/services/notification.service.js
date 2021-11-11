const httpStatus = require('http-status');
const { user } = require('../models');
const error = require('../utils/CodeError');
const CodesError = require('../utils/CodesError');


const refreshToken = async (id, token) => {
    try {
        const userData = await user.findOne({where: {id}});
        userData.registratioToken = token;
        userData.save();
        return userData;
    }catch (e) {
        console.log(`Code: ${httpStatus.BAD_REQUEST}, Error -> ${e}`);
        throw new CodesError(httpStatus.BAD_REQUEST, `Ah ocurrido un error: ${e}`);
    }
};

const deleteToken = async (id) => {
  try {
      const userData = await user.findOne({where: {id}});
      userData.registratioToken = null;
      userData.save();
      return userData;
  }catch (e) {
      console.log(`Code: ${httpStatus.BAD_REQUEST}, Error -> ${e}`);
      throw new CodesError(httpStatus.BAD_REQUEST, `Ah ocurrido un error: ${e}`);
  }
};

module.exports = {
    refreshToken,
    deleteToken
};
