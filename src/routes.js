const Router = require('koa-router');
const users = require('./routes/user');
const partidas = require('./routes/partidas');
const tienda = require('./routes/tienda');
const poderes = require('./routes/poderes');
const dado = require('./routes/dado');
const versus = require('./routes/versus')
const tablero = require('./routes/tablero')
const jugadores = require('./routes/jugador')


const router = new Router();

router.use('/users', users.routes());
router.use('/partidas', partidas.routes());
router.use('/tienda', tienda.routes());
router.use('/poderes', poderes.routes());
router.use("/dado", dado.routes());
router.use("/versus", versus.routes());
router.use("/tablero", tablero.routes());
router.use("/jugadores", jugadores.routes());
module.exports = router;
