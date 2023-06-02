module.exports = {
  up: (QueryInterface) => QueryInterface.bulkInsert('Users', [
    {
      nombre: 'mario',
      clave: 'mario1',
      wins: 0,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      nombre: 'luigi',
      clave: 'luigi1',
      wins: 0,
      createdAt: new Date(),
      updatedAt: new Date()

    }
  ]),
  down: (QueryInterface) => QueryInterface.bulkInsert('Users', null, {}),
}