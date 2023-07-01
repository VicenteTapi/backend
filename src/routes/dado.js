const Router = require('koa-router');
const authUtils = require('../lib/auth/jwt')
const router = new Router();

const casillas = {
  0: 'gana moneda',
  1: 'minijuego',
  2: 'pierde estrella',
  3: 'gana dado',
  4: 'gana estrella',
  5: 'normal',
};
const premioDado = { 1: 'dadoChico', 2: 'dadoGrande' };
const minijuegos = { 1: 'Golpea a Bowser', 2: 'Memorice', 3: 'Evade' };
const dados = {
  "dadoChico": [1, 2, 3],
  "dadoGrande": [4, 5, 6],
  "dadoNormal": [1, 2, 3, 4, 5, 6],
};

// Para uso en front
// const ambientes = {
//   1: 'selva',
//   2: 'lava',
//   3: 'hielo',
// };
const tablero = {
  0: '1',
  1: '5',
  2: '5',
  3: '3',
  4: '5',
  5: '0',
  6: '2',
  7: '5',
  8: '1',
  9: '5',
  10: '4',
  11: '5',
  12: '5',
  13: '0',
  14: '5',
  15: '2',
};


const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

router.post('dado.lanzar', '/lanzar', authUtils.isUser, async (ctx) => {
  try {
    const jugador = await ctx.orm.Jugador.findOne({
      where: { id: ctx.request.body.jugadorId },
    });
    const informacionRelevante = {
      actualPosicion: '',
      actividadCasilla: '',
      minijuego: 'no hay minijuego disponible',
    };
    const { posicion } = jugador;
    const informacion = ctx.request.body.tipo_de_dado;
    const listaAsociada = dados[informacion];
    const respuesta = listaAsociada[getRandomInt(0, listaAsociada.length - 1)];
    const actualPosicion = posicion + respuesta;
    const updateData = {};
    updateData.posicion = actualPosicion;
    const posicionCasilla = actualPosicion % 16;
    const tipoCasilla = tablero[posicionCasilla];
    const actividadCasilla = casillas[tipoCasilla];
    if (actividadCasilla === 'gana moneda') {
      jugador.monedas += 1;
    }
    if (actividadCasilla === 'pierde estrella' && jugador.estrellas > 0) {
      jugador.estrellas -= 1;
    }
    if (actividadCasilla === 'gana dado') {
      const lista = [1, 2];
      const numeroRespuesta = lista[getRandomInt(0, lista.length - 1)];
      const tipoDado = premioDado[numeroRespuesta];
      if (tipoDado === 'dadoChico') {
        jugador.dadoChico += 1;
      }
      if (tipoDado === 'dadoGrande') {
        jugador.dadoGrande += 1;
      }
    }
    if (actividadCasilla === 'gana estrella') {
      jugador.estrellas += 1;
    }
    if (actividadCasilla === 'minijuego') {
      const lista = [1, 2, 3];
      const numeroRespuesta = lista[getRandomInt(0, lista.length - 1)];
      const nombreMinijuego = minijuegos[numeroRespuesta];
      informacionRelevante.minijuego = nombreMinijuego;
    }
    jugador.posicion = actualPosicion % 16;
    await jugador.save();

    const lista = await ctx.orm.Jugador.findAll({
      include: [{ model: ctx.orm.Partida, required: true, where: { id: ctx.request.body.partidaId } }],

    });

    const partida =  await ctx.orm.Partida.findOne({
      where: { id: ctx.request.body.partidaId },
    });
    console.log(`partida= ${partida}\n`)
    console.log(`partida.turno = ${partida.turno}`)
    partida.turno +=1;
    console.log(`\npartida.turno = ${partida.turno}`)
    console.log(`\nLARGO= ${lista.length}`)
    partida.turno = partida.turno % lista.length;
    console.log(`\npartida.turno = ${partida.turno}`)
    await partida.save();



    // // Lógica para cambiar de turno
    // const jugadores = await ctx.orm.Jugador.findAll({
    //   where: { partidaId: jugador.partidaId }
    // });
    // jugadores.sort((a, b) => a.id - b.id);

    // const currentPlayerIndex = jugadores.findIndex(player => player.id === jugador.id);
    // let nextPlayer;

    // if (currentPlayerIndex === jugadores.length - 1) {
    //   nextPlayer = jugadores[0];
    // } else {
    //   nextPlayer = jugadores[currentPlayerIndex + 1];
    // }
    // // Fin de la lógica de cambio de turno

    informacionRelevante.actualPosicion = posicionCasilla;
    informacionRelevante.actividadCasilla = actividadCasilla;
    // Añade el próximo jugador al cuerpo de respuesta
    

    ctx.body = [jugador, informacionRelevante];
    ctx.status = 201;

  } catch (error) {
    console.error(error);
    ctx.body = error;
    ctx.status = 404;
  }
});

module.exports = router;
