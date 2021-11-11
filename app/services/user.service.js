const httpStatus = require('http-status');
const { Op} = require('sequelize');
const _ =  require('lodash');
const error = require('../utils/CodeError');
const CodesError = require('../utils/CodesError');
const {user} = require('../models');


const createUser = async (userBody) => {

    if ( (await user.isEmailTaken(userBody.email)) || (await user.isUsernameTaken(userBody.username))){
        console.log('Email o username is already taken');
        return error.Error400UserExiste;
    }
    const userCreate = await user.create(userBody);
    return userCreate;
};

const getUserById = async (id) => {
    try {
        const getUser = await user.findOne({
            where: {
                id: id,
                status: {
                    [Op.notIn]: [3,4]
                }
            }
        });
        return _.omit(getUser.dataValues, 'password');
    }catch (e) {
        throw console.log(`CODE: ${httpStatus.INTERNAL_SERVER_ERROR}, Error: -> ${e}`);
    }
};

const getUserByEmail = async (email) => {
    return user.findOne({
        where: {
            email,
            status: {
                [Op.notIn]: [3, 4],
            },
        },
    });
};

const queryUsers = async (options) => {
    try {
        const results = await user.paginate(options);
        const users = _.map(results.docs, function (result) {
            return _.omit(result.dataValues, 'password');
        });
        return users;
    } catch (error) {
        throw new CodesError(httpStatus.INTERNAL_SERVER_ERROR, `An error ocurred${error}`);
    }
};

const updateUserById = async (id, updateBody) => {

    const getUser = await user.findOne({
        where: {
            id,
            status: {
                [Op.notIn]: [3, 4],
            },
        }
    });

    if (!getUser) {
        console.log('usuario no encontrado');
        return error.Error204;
    }

    if (updateBody.email && (await user.isEmailTaken(updateBody.email, id))){
        console.log('Email ya existe');
        return error.Error400UserExiste;
    }

    Object.assign(user, updateBody);
    await getUser.save();
    return error.Error200Exitoso;

};

const deleteUserById = async (id) => {
    const getUser = getUserById(id);
    if (!getUser) {
        console.log('Usuario no existente');
        return error.Error204
    }

    getUser.update({status: 4})

    return getUser;
};

module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById,
    queryUsers

};
