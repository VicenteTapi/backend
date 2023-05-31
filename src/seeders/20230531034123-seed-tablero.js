module.exports = {
  up: (QueryInterface) => QueryInterface.bulkInsert('Tableros', [
    {
      ambiente: 'lava',
      coordenadas: '{"0": "hola", "1": "chao"}',
      createdAt: new Date(),
      updatedAt: new Date()

    }
  ]),
  down: (QueryInterface) => QueryInterface.bulkInsert('Tableros', null, {}),
}