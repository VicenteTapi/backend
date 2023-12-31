const Router = require('koa-router')
const authUtils = require('../lib/auth/jwt')
const router = new Router();

router.get('user.list', '/', authUtils.isAdmin, async (ctx) => {
    try {
      const user = await ctx.orm.User.findAll();
      ctx.body = user;
      ctx.status = 200;
    } catch (error) {
      ctx.body = error;
      ctx.status = 404;
    }
});

router.del('user.delete', '/:id', authUtils.isAdmin, async (ctx) => {
    try {
      const user = await ctx.orm.User.findOne({ where: { id: ctx.params.id } });
      if (user) {
        await user.destroy();
        ctx.status = 204; 
      } else {
        ctx.status = 404; 
        ctx.body = { error: 'User not found' };
      }
    } catch (error) {
      console.log(error)
      ctx.status = 400; 
      ctx.body = { error: 'Bad request' };
    }
});
router.put("user.hacerAdmin", "/haceradmin", async (ctx) => {
    try{
        const authInfo = ctx.request.body
        let user = await ctx.orm.User.findOne({ where: { id: authInfo.userId } })
        if (!user) {
            ctx.body = `The user by the id '${authInfo.userId}' was not found`;
            ctx.status = 400;
            return;
        }
        user.isAdmin = true;
        await user.save();
        ctx.body = `The user '${user.nombre}' is now an admin`;
        ctx.status = 200;
    }catch (error) {
        ctx.status = 400; 
        ctx.body = { error: 'Bad request' };
      }
    

});
router.del('user.deleteAll', '/', authUtils.isAdmin, async (ctx) => {
    try {
      await ctx.orm.User.destroy({ where: {}, truncate: true });
      ctx.status = 204; 
    } catch (error) {
      ctx.status = 400; 
      ctx.body = { error: 'Bad request' };
    }
});
  
module.exports = router;