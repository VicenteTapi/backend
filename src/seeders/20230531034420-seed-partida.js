module.exports = {
  up: (QueryInterface) => QueryInterface.bulkInsert('Partidas', [
    {
      ambiente: 1,
      tiendaId: 1,
      turno: 0,
      createdAt: new Date(),
      updatedAt: new Date(),

    },
  ]),
  down: (QueryInterface) => QueryInterface.bulkInsert('Partidas', null, {}),
};
