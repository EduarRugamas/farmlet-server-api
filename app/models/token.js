const {Model, DataTypes} = require('sequelize');
const sequelizePaginate =  require('sequelize-paginate');
const sequelize = require('../db');

const token = class token extends Model {
    static associate(models) {
        // define association here
    };
};

token.init(
    {
        token: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('refresh', 'resetPassword'),
            allowNull: false,
        },
        expires: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        blacklisted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'token',
        freezeTableName: true
    }
);

sequelizePaginate.paginate(token);

module.exports = token;
