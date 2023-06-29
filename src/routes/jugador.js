const Router = require('koa-router');
const { Op } = require('sequelize');
const router = new Router();

router.get('jugador.obtener', '/:jugadorId', async (ctx) => {
    console.log("entre al get");
    try {
      const principal = await ctx.orm.Jugador.findOne({
        where: { id: ctx.params.jugadorId },
      });
      console.log("entre al get");
  
      if (!principal) {
        ctx.status = 404;
        ctx.body = 'Jugador no encontrado';
        return;
      }
  
      const jugadores = await ctx.orm.Jugador.findAll({
        where: { partidaId: principal.partidaId }
      });
      
      jugadores.sort((a, b) => a.userId > b.userId ? 1 : -1);

      const main = [];
      const rivales = [];
      const posiciones = {};
      jugadores.forEach(jugador => {
          if (jugador.userId == principal.userId){
              main.push(jugador);
              main.push(jugadores.indexOf(jugador))
          } else {
              rivales.push(jugador);
          }
          posiciones[jugador.personaje] = jugador.posicion;          
      });


      ctx.status = 200;
      ctx.body = [main, rivales, posiciones];
  
    } catch (error) {
      console.error(error);
      ctx.body = error;
      ctx.status = 500;
    }
  });
  
module.exports = router;