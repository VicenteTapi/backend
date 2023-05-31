'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Versus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      jugadorId: {
        type: Sequelize.INTEGER,
        references: {model: 'Jugadors', key: 'id'}
      },
      minijuegoId: {
        type: Sequelize.INTEGER,
        references: {model: 'Minijuegos', key: 'id'}
      },
      partidaId: {
        type: Sequelize.INTEGER,
        references: {model: 'Partidas', key: 'id'}
      },
      jugo: {
        type: Sequelize.BOOLEAN
      },
      score: {
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
    await queryInterface.dropTable('Versus');
  }
};