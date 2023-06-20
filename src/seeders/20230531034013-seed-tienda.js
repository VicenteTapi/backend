module.exports = {
  up: (QueryInterface) => QueryInterface.bulkInsert('Tiendas', [
    {
      estrellas: 10,
      dadoChico: 10,
      dadoGrande: 10,
      poder1: 10,
      poder2: 10,
      poder3: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      estrellas: 10,
      dadoChico: 10,
      dadoGrande: 10,
      poder1: 10,
      poder2: 10,
      poder3: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]),
  down: (QueryInterface) => QueryInterface.bulkInsert('Tiendas', null, {}),
};
