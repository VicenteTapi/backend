const Router = require('koa-router');
const { Op } = require('sequelize');

const router = new Router();

// Lista de partidas asociadas al usuario
router.get('partida.list', '/:id', async (ctx) => {
  const lista = [];
  try {
    const jugadores = await ctx.orm.Jugador.findAll({
      include: [
        { model: ctx.orm.User, required: true, where: { id: ctx.params.id } },
        { model: ctx.orm.Partida, required: true }],
    });

    jugadores.forEach((element) => {
      lista.push(element.Partida);
    });
    ctx.body = lista;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 404;
  }
});

// Lista de partidas a las que el usuario puede unirse
// Display debe manejarse en el front
router.get('partida.browse', '/browse/:id', async (ctx) => {
  const lista = [];

  try {
    const jugadores = await ctx.orm.Jugador.findAll({
      include: [
        { model: ctx.orm.User, required: true, where: { id: { [Op.ne]: ctx.params.id } } },
        { model: ctx.orm.Partida, required: true }],
    });

    jugadores.forEach((element) => {
      lista.push(element.Partida);
    });
    ctx.body = lista;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 404;
  }
});

// Crear nueva Partida
// Se debe crear una instancia de Tienda, Partida y Jugador
router.post('partida.create', '/crear', async (ctx) => {
  try {
    const tienda = await ctx.orm.Tienda.create({
      estrellas: 10,
      dadoChico: 10,
      dadoGrande: 10,
      poder1: 10,
      poder2: 10,
      poder3: 10,
    });
    const partida = await ctx.orm.Partida.create({
      ambiente: ctx.request.body.ambiente,
      turno: 0,
      tiendaId: tienda.id,
    });
    const jugador = await ctx.orm.Jugador.create({
      personaje: ctx.request.body.personaje,
      posicion: 0,
      monedas: 10,
      estrellas: 0,
      poder1: 0,
      poder2: 0,
      poder3: 0,
      dadoChico: 0,
      dadoGrande: 0,
      userId: ctx.request.body.id,
      partidaId: partida.id,
    });

    ctx.body = [tienda, partida, jugador];
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 404;
  }
});

router.post('partida.join', '/unirse', async (ctx) => {
  try {
    const jugador = await ctx.orm.Jugador.create({
      personaje: ctx.request.body.personaje,
      posicion: 0,
      monedas: 10,
      estrellas: 0,
      poder1: 0,
      poder2: 0,
      poder3: 0,
      dadoChico: 0,
      dadoGrande: 0,
      userId: ctx.request.body.userId,
      partidaId: ctx.request.body.partidaId,
    });

    ctx.body = [jugador];
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 404;
  }
});

module.exports = router;
