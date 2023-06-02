module.exports = {
  up: (QueryInterface) => QueryInterface.bulkInsert('Jugadors', [
    {
      personaje: 'mario',
      posicion: 0,
      monedas: 20,
      estrellas: 0,
      poder1: 0,
      poder2: 0,
      poder3: 0,
      dadoGrande: 0,
      dadoChico: 0,
      userId: 1,
      partidaId:1,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      personaje: 'luigi',
      posicion: 0,
      monedas: 15,
      estrellas: 0,
      poder1: 0,
      poder2: 0,
      poder3: 0,
      dadoGrande: 0,
      dadoChico: 0,
      userId: 2,
      partidaId:1,
      createdAt: new Date(),
      updatedAt: new Date()

    }
  ]),
  down: (QueryInterface) => QueryInterface.bulkInsert('Jugadors', null, {}),
}           
