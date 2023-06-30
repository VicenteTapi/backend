module.exports = {
  up: (QueryInterface) => QueryInterface.bulkInsert('Partidas', [
    {
      ambiente: "lava",
      tiendaId: 1,
      turno: 0,
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      ambiente: "selva",
      tiendaId: 2,
      turno: 0,
      createdAt: new Date(),
      updatedAt: new Date(),

    }
  ]),
  down: (QueryInterface) => QueryInterface.bulkInsert('Partidas', null, {}),
};
