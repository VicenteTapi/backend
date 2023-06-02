module.exports = {
  up: (QueryInterface) => QueryInterface.bulkInsert('Tiendas', [
    {
      item: 'estrella',
      cantidad: 5,
      precio: 10,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      item: 'poder1',
      cantidad: 5,
      precio: 20,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      item: 'dado chico',
      cantidad: 5,
      precio: 10,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      item: 'dado grande',
      cantidad: 5,
      precio: 20,
      createdAt: new Date(),
      updatedAt: new Date()

    }
  ]),
  down: (QueryInterface) => QueryInterface.bulkInsert('Tiendas', null, {}),
}