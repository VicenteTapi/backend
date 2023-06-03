const Router = require('koa-router');
const users = require('./routes/user');
const partidas = require('./routes/partidas');
const tienda = require('./routes/tienda');
const poderes = require('./routes/poderes');
const dado = require('./routes/dado');

const router = new Router();

router.use('/users', users.routes());
router.use('/partidas', partidas.routes());
router.use('/tienda', tienda.routes());
router.use('/poderes', poderes.routes());

router.use('/dado', dado.routes());
module.exports = router;
