const Router = require('koa-router');
const { Op } = require("sequelize");

const router = new Router();


let getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
router.post("versus.crear", "/crear", async(ctx) => {
    try {
        console.log("\nentré a versus\n")
        
        ó
        const jugadores = await ctx.orm.Jugador.findAll({
            where: {partidaId: ctx.request.body.partidaId}
        });

        console.log(`\n esto aparece en jugadores:${jugadores}\n`)
        
        //map es un metodo que me sugirió chatgpt cuando le pregunté como recorrer un json
        const versusPromises = jugadores.map((jugador) => {
            return ctx.orm.Versus.create({
                "jugadorId": jugador.id,  
                "partidaId": ctx.request.body.partidaId,
                "minijuego": ctx.request.body.minijuego,
                "jugo": false,
                "score": 0,
            });
        });

        const versusInstances = await Promise.all(versusPromises);
        
        ctx.body = versusInstances;
        ctx.status = 201;
    } catch (error) {
        ctx.body = error;
        ctx.status = 404;
    }
})

router.post("versus.jugar", "/jugar", async(ctx) => {
    try {
        console.log("\nentré a jugar\n")

        const jugador = await ctx.orm.Versus.findOne({
            where: {
                jugadorId: ctx.request.body.jugadorId,
                partidaId: ctx.request.body.partidaId,
                minijuego: ctx.request.body.minijuego
            }
        });

        let lista = [1,2,3,4,5,6,7,8,9,10]
        let numero_respuesta = lista[getRandomInt(0, lista.length - 1)]
        jugador.score = numero_respuesta
        jugador.jugo = true
        await jugador.save();

        const jugadoresVersus = await ctx.orm.Versus.findAll({
            where: {
                partidaId: ctx.request.body.partidaId,
                minijuego: ctx.request.body.minijuego
            }
        });

        let todosHanJugado = true
        let maxScore = 0
        let ganador = null
        let puntajes = {}

        for(let i = 0; i < jugadoresVersus.length; i++){
            let jugadorVersus = jugadoresVersus[i]
            puntajes[jugadorVersus.jugadorId] = jugadorVersus.score
            if(!jugadorVersus.jugo) {
                todosHanJugado = false
            }
            if(jugadorVersus.score > maxScore) {
                maxScore = jugadorVersus.score
                ganador = jugadorVersus.jugadorId
            }
        }
        
        if(todosHanJugado) {
            puntajes['ganador'] = ganador
            ctx.body = puntajes
            ctx.status = 201
        } else {
            ctx.status = 202
        }
        
    } catch (error) {
        ctx.body = error;
        ctx.status = 404;
    }
})
module.exports = router;