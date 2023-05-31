module.exports = {
  up: (QueryInterface) => QueryInterface.bulkInsert('Tiendas', [
    {
      item: 'estrella',
      cantidad: 5,
      precio: 10,
      createdAt: new Date(),
      updatedAt: new Date()

    }
  ]),
  down: (QueryInterface) => QueryInterface.bulkInsert('Tiendas', null, {}),
}