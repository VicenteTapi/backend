const Koa = require('koa');
const KoaLogger = require('koa-logger');
const { koaBody } = require('koa-body');
const cors = require('@koa/cors');
const router = require('./routes.js');
const orm = require('./models');

// Instancia de Koa
const app = new Koa();

app.context.orm = orm;

app.use(cors());

// Middlewares de koa
app.use(KoaLogger());
app.use(koaBody());

// Router
app.use(router.routes());

// Middlewares personalizados
app.use((ctx, next) => {
  ctx.body = 'Hola Mundo';
});

module.exports = app;
