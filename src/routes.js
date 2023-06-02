const Router = require('koa-router');
const users = require('./routes/user.js');
const tienda = require('./routes/tienda.js');

const router = new Router();

router.use("/users", users.routes());
router.use("/tienda", tienda.routes());

module.exports = router;
