const Router = require('koa-router');
const { Op } = require('sequelize');

const router = new Router();

router.get('tablero.obtener', '/:jugadorId', async (ctx) => {
  const tableros = {
    "selva":{
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
      15: '2'
    },
    "lava":{
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
      15: '2'
    },
    "hielo":{
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
      15: '2'
    }
  };
    try {
      const jugador = await ctx.orm.Jugador.findOne({
        where: { id: ctx.params.jugadorId }
      });
      info = jugador.partidaId
      const partida = await ctx.orm.Partida.findOne({
        where: { id: info}
      });
      console.log("entré al log")

      const tablero = {};
      tablero[partida.ambiente] = tableros[partida.ambiente];

      ctx.body = tablero;
      ctx.status = 200;
    } catch (error) {
      ctx.body = error;
      ctx.status = 404;
    }
  });
  


module.exports = router;