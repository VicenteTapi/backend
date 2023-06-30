'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Paso 1: Agrega la columna permitiendo valores nulos
    await queryInterface.addColumn('Users', 'mail', {
      type: Sequelize.STRING,
      allowNull: true, // Permite valores nulos inicialmente
    });

    // Paso 2: Actualiza los registros existentes con un valor por defecto
    await queryInterface.sequelize.query(
      `UPDATE "Users" SET "mail"='default@mail.com' WHERE "mail" IS NULL`
    );

    // Paso 3: Cambia la columna para no permitir valores nulos
    await queryInterface.changeColumn('Users', 'mail', {
      type: Sequelize.STRING,
      allowNull: false, // No permite valores nulos
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'mail');
  }
};