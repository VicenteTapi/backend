const Router = require('koa-router');

const router = new Router();

const precios = {
  estrellas: 20,
  dadoChico: 10,
  dadoGrande: 10,
  poder1: 20,
  poder2: 12,
  poder3: 7,
};

// GET del inventario de la tienda, para poder comprar se debe estar dentro de una partida,
// por lo que se asume que partidaId estará almecenada en alguna cookie
// El precio y variedad es siempre el mismo por lo que se almacena como array en el front
router.get('tienda.show', '/:partidaId', async (ctx) => {
  try {
    const stock = await ctx.orm.Partida.findOne({
      where: { id: ctx.params.partidaId },
      include: [{ model: ctx.orm.Tienda, required: true }],
    });
    ctx.body = [stock.Tienda, precios];
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 404;
  }
});

// En el body se envía el item deseado, el id de partida el id del jugador
//  también almacenado en una teórica cookie
// Inspiración:
// https://stackoverflow.com/questions/51944160/sequelize-update-row-where-col-dynamic-variable
router.post('tienda.comprar', '/comprar', async (ctx) => {
  try {
    const tienda = await ctx.orm.Partida.findOne({
      where: { id: ctx.request.body.partidaId },
      include: [{ model: ctx.orm.Tienda, required: true }],

    });
    const tiendaId = tienda.Tienda.id;

    const updateData = {};
    updateData[ctx.request.body.item] = 1;
    const stock = await ctx.orm.Tienda.decrement(updateData, { where: { id: tiendaId } }).then();

    //

    const updateBilletera = {};
    updateBilletera.monedas = precios[ctx.request.body.item];
    const saldo = await ctx.orm.Jugador.decrement(
      updateBilletera,
      { where: { id: ctx.request.body.jugadorId } },
    ).then();

    ctx.body = [stock, saldo];
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 404;
  }
});

module.exports = router;
