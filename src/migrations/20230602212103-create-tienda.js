'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tiendas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      estrellas: {
        type: Sequelize.INTEGER
      },
      dadoChico: {
        type: Sequelize.INTEGER
      },
      dadoGrande: {
        type: Sequelize.INTEGER
      },
      poder1: {
        type: Sequelize.INTEGER
      },
      poder2: {
        type: Sequelize.INTEGER
      },
      poder3: {
        type: Sequelize.INTEGER
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tiendas');
  }
};