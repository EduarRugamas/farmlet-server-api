const httpStatus = require('http-status');
const { Op} = require('sequelize');
const CodesError = require('../utils/CodesError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync( async (req, res) => {
    const user = await userService.createUser(req.body);
    const data = {
        id: user.dataValues.id,
        username: user.dataValues.username,
        email: user.dataValues.email,
        role: user.dataValues.role,
        status: user.dataValues.status
    };
    res.status(httpStatus.CREATED).send(data);
});

const getUsers = catchAsync(async (req, res) => {
    const options = {
        where: {
            status: {
                [Op.notIn]: [4],
            },
        },
        page: 1,
        paginate: 10,
        order: [['id', 'DESC']],
    };

    const result = await userService.queryUsers(options);

    res.send(result);
});

const getUser = catchAsync( async (req, res) => {
   const user = await userService.getUserById(req.params.id);
   if (!user){
       throw new CodesError(httpStatus.NOT_FOUND, 'Usuario no encontrado');
   }

   res.send(user);
});

const updateUser = catchAsync( async (req, res) =>{
   const user = await userService.updateUserById(req.params.id, req.body);
   res.send(user);
});

const deleteUser = catchAsync( async (req, res) => {
    await userService.deleteUserById(req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getUsers
}
