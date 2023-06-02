const Router = require('koa-router');

const router = new Router();

router.get("user.show", "/:id", async(ctx) => {
    try {
        const user = await ctx.orm.User.findOne({where:{id:ctx.params.id}});
        ctx.body = user;
        ctx.status = 200;
    } catch (error) {
        ctx.body = error;
        ctx.status = 404;
    }
});

router.get("user.list", "/", async(ctx) => {
    try {
        const user = await ctx.orm.User.findAll();
        ctx.body = user;
        ctx.status = 200;
    } catch (error) {
        ctx.body = error;
        ctx.status = 404;
    }
});

router.post("user.create", "/", async(ctx) => {
    try {
        const user = await ctx.orm.User.create(ctx.request.body);
        ctx.body = user;
        ctx.status = 201;
    } catch (error) {
        ctx.body = error;
        ctx.status = 404;
    }
});

module.exports = router;