module.exports = {
  up: (QueryInterface) => QueryInterface.bulkInsert('Users', [
    {
      nombre: 'mario',
      clave: 'mario1',
      wins: 0,
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      nombre: 'luigi',
      clave: 'luigi1',
      wins: 0,
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      nombre: 'castor',
      clave: 'castor1',
      wins: 0,
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      nombre: 'doge',
      clave: 'doge1',
      wins: 0,
      createdAt: new Date(),
      updatedAt: new Date(),

    },
  ]),
  down: (QueryInterface) => QueryInterface.bulkInsert('Users', null, {}),
};
