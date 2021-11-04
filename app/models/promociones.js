'use strict';
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../db')

  const promociones = class promociones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  promociones.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    imagen: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'promociones',
  });

export default promociones
