'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const sequelize = require('../db');

  const medicamentos = class medicamentos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  medicamentos.init({
    Nombre: DataTypes.STRING,
    Descripcion: DataTypes.STRING,
    Precio: DataTypes.FLOAT,
    Imagen: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'medicamentos',
  });

  module.exports = medicamentos;


