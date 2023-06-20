const Router = require('koa-router');
const { Op } = require('sequelize');

const router = new Router();

router.get('tablero.obtener', '/:jugadorId', async (ctx) => {
    const lista = [];
    try {
      const jugador = await ctx.orm.Jugador.findOne({
        where: { id: ctx.params.jugadorId }
      });
      info = jugador.partidaId
      const partida = await ctx.orm.Partida.findOne({
        where: { id: info}
      });
      console.log("entré al log")
      ambientes = { "ambiente": partida.ambiente}
      ctx.body = ambientes;
      ctx.status = 200;
    } catch (error) {
      ctx.body = error;
      ctx.status = 404;
    }
  });
  


module.exports = router;