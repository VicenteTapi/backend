const Router = require('koa-router');

const router = new Router();

// Recibe el id del jugador que activa el poder y se le otorga una estrella
router.post('poder.estrella', '/mas1', async (ctx) => {
  try {
    await ctx.orm.Jugador.decrement({ poder1: 1 }, { where: { id: ctx.request.body.jugadorId } });
    const jugador = await ctx.orm.Jugador.increment(
      { estrellas: 1 },
      { where: { id: ctx.request.body.jugadorId } },
    );
    ctx.body = jugador;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 404;
  }
});

// Display de los jugadores utilizado en poder2: intercambio de posiciones
// Y en poder3: robar dado
router.get('jugadores.get', '/:partidaId', async (ctx) => {
  try {
    const lista = await ctx.orm.Jugador.findAll({
      include: [{ model: ctx.orm.Partida, required: true, where: { id: ctx.params.partidaId } }],
    });
    ctx.body = lista;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 404;
  }
});

// Recibe el id del jugador y de su victima (obtenido gracias al GET anterior)
// Se intercambian posiciones
router.post('poder.swap', '/cambio', async (ctx) => {
  try {
    await ctx.orm.Jugador.decrement({ poder2: 1 }, { where: { id: ctx.request.body.jugadorId } });

    const jugador = await ctx.orm.Jugador.findOne({ where: { id: ctx.request.body.jugadorId } });
    const victima = await ctx.orm.Jugador.findOne({ where: { id: ctx.request.body.victimaId } });

    const posJugador = jugador.posicion;
    const posVictima = victima.posicion;

    await ctx.orm.Jugador.update(
      { posicion: posVictima },
      { where: { id: ctx.request.body.jugadorId } },
    );

    await ctx.orm.Jugador.update(
      { posicion: posJugador },
      { where: { id: ctx.request.body.victimaId } },
    );

    const jugadorNuevo = await ctx.orm.Jugador.findOne(
      { where: { id: ctx.request.body.jugadorId } },
    );

    const victimaNueva = await ctx.orm.Jugador.findOne(
      { where: { id: ctx.request.body.victimaId } },
    );

    ctx.body = [jugadorNuevo, victimaNueva];
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 404;
  }
});

// Recibe el id del jugador, el id de su victima (obtenido gracias al GET)
// y el tipo de dado que desea robar
router.post('poder.robo', '/robo', async (ctx) => {
  try {
    await ctx.orm.Jugador.decrement({ poder3: 1 }, { where: { id: ctx.request.body.jugadorId } });

    dataUpdate = {};
    dataUpdate[ctx.request.body.dado] = 1;
    const jugador = await ctx.orm.Jugador.increment(
      dataUpdate,
      { where: { id: ctx.request.body.jugadorId } },
    );

    const victima = await ctx.orm.Jugador.decrement(
      dataUpdate,
      { where: { id: ctx.request.body.victimaId } },
    );

    ctx.body = [jugador, victima];
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 404;
  }
});

module.exports = router;
