'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Listmedicamentos', {
      id_medicamentos: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Descripcion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Precio: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      Imagen: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Listmedicamentos');
  }
};
