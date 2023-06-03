'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jugadors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      personaje: {
        type: Sequelize.STRING
      },
      posicion: {
        type: Sequelize.INTEGER
      },
      monedas: {
        type: Sequelize.INTEGER
      },
      estrellas: {
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
      dadoGrande: {
        type: Sequelize.INTEGER
      },
      dadoChico: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {model: 'Users', key: 'id'}
      },
      partidaId: {
        type: Sequelize.INTEGER,
        references: {model: 'Partidas', key: 'id'}
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
    await queryInterface.dropTable('Jugadors');
  }
};