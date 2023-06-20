const Router = require('koa-router');
const { Op } = require('sequelize');
const router = new Router();

router.get('jugador.obtener', '/:jugadorId', async (ctx) => {
    console.log("entre al get");
    try {
      const jugador = await ctx.orm.Jugador.findOne({
        where: { id: ctx.params.jugadorId },
      });
      console.log("entre al get");
  
      if (!jugador) {
        ctx.status = 404;
        ctx.body = 'Jugador no encontrado';
        return;
      }
  
      const jugadores = await ctx.orm.Jugador.findAll({
        where: { partidaId: jugador.partidaId }
      });
  
      ctx.status = 200;
      ctx.body = jugadores;
  
    } catch (error) {
      console.error(error);
      ctx.body = error;
      ctx.status = 500;
    }
  });
  
module.exports = router;