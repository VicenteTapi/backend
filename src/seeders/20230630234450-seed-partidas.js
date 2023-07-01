'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (QueryInterface) => QueryInterface.bulkInsert('Partidas', [
    {
      ambiente: "lava",
      tiendaId: 3,
      turno: 0,
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      ambiente: "selva",
      tiendaId: 4,
      turno: 0,
      createdAt: new Date(),
      updatedAt: new Date(),

    }
  ]),
  down: (QueryInterface) => QueryInterface.bulkInsert('Partidas', null, {}),
};
