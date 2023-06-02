const Router = require('koa-router');
const users = require('./routes/user.js');

const partidas = require('./routes/partidas.js');

const tienda = require('./routes/tienda.js');


const router = new Router();

router.use("/users", users.routes());

router.use("/partidas", partidas.routes())

router.use("/tienda", tienda.routes());


module.exports = router;
