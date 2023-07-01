const Router = require('koa-router');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

const router = new Router();

//Código basado en las capsulas de la ayudantía
router.post("authentication.signup", "/signup", async (ctx) => {
    const authInfo = ctx.request.body;
    let user = await ctx.orm.User.findOne({ where: { mail: authInfo.email } })
    if (user) {
        ctx.body = `The user by the email '${authInfo.email}' already exists`;
        ctx.status = 400;
        return;
    }

    try {
        const saltRounds = 10
        hashclave = await bcrypt.hash(authInfo.clave, saltRounds)
        user = await ctx.orm.User.create({
            nombre: authInfo.nombre,
            clave: hashclave,
            wins: 0,
            mail: authInfo.email,
            isAdmin: false
        })
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
        return;
    }
    ctx.body = {
        nombre: user.nombre,
        email: user.mail
    };
    ctx.status = 201;
})
router.put("user.requestAdmin", "/requestAdmin", async (ctx) => {
    const authInfo = ctx.request.body
    let user = await ctx.orm.User.findOne({ where: { mail: authInfo.email } })
    if (!user) {
        ctx.body = `The user by the email '${authInfo.email}' was not found`;
        ctx.status = 400;
        return;
    }
    if (await bcrypt.compare(authInfo.clave, user.clave)) {
        if(user.nombre=="admin" && user.mail=="admin@admin.cl"){
            user.isAdmin = true;
            await user.save();
            ctx.body = `The user '${user.nombre}' is now an admin`;
            ctx.status = 200;
            return;
        }else{
            ctx.body = "Only user 'admin' can perform this action";
            ctx.status = 403;
            return;
        }
    } else {
        ctx.body = "Incorrect password";
        ctx.status = 400;
        return;
    }
});


router.post("authentication.login", "/login", async (ctx) => {
    let user;
    const authInfo = ctx.request.body
    try {
        user = await ctx.orm.User.findOne({where:{mail:authInfo.email}});
    }
    catch(error) {
        ctx.body = error;
        ctx.status = 400;
        return;
    }
    if (!user) {
        ctx.body = `The user by the email '${authInfo.email}' was not found`;
        ctx.status = 400;
        return;
    }
    console.log(user.clave)
    console.log(authInfo.clave)
    if (await bcrypt.compare(authInfo.clave, user.clave)) {
        ctx.body = {
            nombre: user.nombre,
            email: user.mail,
        };
        ctx.status = 200;
    } else {
        ctx.body = "Incorrect password";
        ctx.status = 400;
        return;
    }

    const expirationSeconds = 1 * 60 * 60 * 24;
    const JWT_PRIVATE_KEY = process.env.JWT_SECRET;
    let scope = ['user'];
    
    if (user.isAdmin) {
        scope.push('admin');
    }

    var token = jwt.sign(
        { scope: scope },
        JWT_PRIVATE_KEY,
        { subject: user.id.toString(), expiresIn: expirationSeconds }
    );

    ctx.body = {
        nombre: user.nombre,
        email: user.mail,
        "access_token": token,
        "token_type": "Bearer",
        "expires_in": expirationSeconds,
        userId: user.id
    };
    ctx.status = 200;
})

module.exports = router;