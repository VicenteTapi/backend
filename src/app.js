const Koa = require('koa');
const KoaLogger = require('koa-logger');
const KoaBody = require('koa-body');
const cors = require('@koa/cors');
const router = require('./routes');
const orm = require('./models');

// Instancia de Koa
const app = new Koa();

app.context.orm = orm;

app.use(cors);

// Middlewares de koa
app.use(KoaLogger());
app.use(KoaBody.koaBody());

// Router
app.use(router.routes());

// Middlewares personalizados
app.use((ctx, next) => {
  ctx.body = 'Hola Mundo';
});

module.exports = app;
