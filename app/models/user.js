const bcrypt = require('bcryptjs');
const {Model, DataTypes, Op} = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');
const sequelize = require('../db');
const {roles} = require('../config/roles');


const user = class user extends Model {
    static associate(models) {
        // define association here
    };
};
user.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            isLowercase: true
        },
        email: {
        type: DataTypes.STRING,
            allowNull: false,
            unique:true,
            isLowercase: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isStrong(value) {
                    if (!value.match(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/)) {
                        throw new Error('Password demasiado corta y tiene que ser al menos 8 caracteres');
                    }
                }
            }
        },
        role: {
            type: DataTypes.ENUM( { values: roles } ),
            allowNull: false,
            validate: {
                isIn: {
                    args: [roles],
                    msg: 'Tipo Invalido'
                }
            }
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 2,
            validate: {
                min: 1,
                max: 4,
            },
        },
        registrationToken: {
            type: DataTypes.STRING,
        },
}, {
        sequelize,
        modelName: 'user',
        freezeTableName: true,
         hooks: {
             beforeCreate: async (user) => {
                 if (user.changed('password')) {
                     // eslint-disable-next-line no-param-reassign
                     user.password = await bcrypt.hash(user.password, 8);
                 }
             },
             beforeUpdate: async (user) => {
                 if (user.changed('password')) {
                     // eslint-disable-next-line no-param-reassign
                     user.password = await bcrypt.hash(user.password, 8);
                 }
             },
         }
    }
);

user.isUsernameTaken = async function (username, excludeUserId) {
    const userIdExist = excludeUserId ? { username, id: { [Op.ne]: excludeUserId } } : { username };
    const user = await this.findOne({
        where: userIdExist,
    });
    return !!user;
};

user.isEmailTaken = async function (email, excludeUserId) {
    const userIdExist = excludeUserId ? { email, id: { [Op.ne]: excludeUserId } } : { email };
    const user = await this.findOne({
        where: userIdExist,
    });
    return !!user;
};

user.prototype.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};

sequelizePaginate.paginate(user);

module.exports = user;

