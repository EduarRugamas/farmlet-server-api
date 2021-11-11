const httpStatus = require('http-status');
const { user } = require('../models');
const error = require('../utils/CodeError');


const refreshToken = async (id, token) => {
    try {
        const userData = await user.findOne({where: {id}});
        userData.registratioToken = token;
        userData.save();
        return userData;
    }catch (e) {
        console.log(`Code: ${httpStatus.BAD_REQUEST}, Error -> ${e}`);
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
  }
};

module.exports = {
    refreshToken,
    deleteToken
};
