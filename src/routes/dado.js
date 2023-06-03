const Router = require('koa-router');
const { Op } = require("sequelize");

const router = new Router();

const casillas = {
    "0": "gana moneda",
    "1": "minijuego",
    "2": "pierde estrella",
    "3": "gana dado",
    "4": "gana estrella",
    "5": "normal" 
}
const premio_dado = {1:"dadoChico", 2:"dadoGrande"}
const minijuegos = {1:"Golpea a Bowser", 2:"Memorice", 3:"Evade"}
const dados = {
    "dadoChico":[1,2,3],
    "dadoGrande":[4,5,6],
    "dadoNormal":[1,2,3,4,5,6]
}
const ambientes = {
    "1": "selva", 
    "2":"lava", 
    "3":"hielo"
}
const tablero = {
    0: "1",
    1: "5",
    2: "5",
    3: "3",
    4: "5",
    5: "0",
    6: "2",
    7: "5",
    8: "1",
    9: "5",
    10: "4",
    11: "5",
    12: "5",
    13: "0",
    14: "5",
    15: "2"
}
//La función getRandomInt se hizo con la ayuda de chatGPT
let getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.post("dado.lanzar", "/lanzar", async(ctx) => {
    try {
        const jugador = await ctx.orm.Jugador.findOne({
            where:{id: ctx.request.body.jugadorId}
        
        })
        let informacion_relevante = {
            "actual_posicion": "",
            "actividad_casilla": "",
            "minijuego": "no hay minijuego disponible"
        };
        let posicion = jugador.posicion
        let informacion = ctx.request.body.tipo_de_dado
        let listaAsociada = dados[informacion];
        let respuesta = listaAsociada[getRandomInt(0, listaAsociada.length - 1)];
        let actual_posicion = posicion+respuesta
        let updateData = {};
        updateData["posicion"] = actual_posicion;
        let posicion_casilla = actual_posicion%16
        let tipo_casilla = tablero[posicion_casilla]
        let actividad_casilla = casillas[tipo_casilla]
        if (actividad_casilla=="gana moneda"){
            jugador.monedas +=1
        }
        if (actividad_casilla=="pierde estrella" && jugador.estrellas >0){
            jugador.estrellas -=1
        }
        if (actividad_casilla=="gana dado"){
            let lista = [1,2]
            let numero_respuesta = lista[getRandomInt(0, lista.length - 1)]
            let tipo_dado = premio_dado[numero_respuesta]
            if (tipo_dado=="dadoChico"){
                jugador.dadoChico +=1
            }
            if (tipo_dado=="dadoGrande"){
                jugador.dadoGrande +=1
            }
        }
        if (actividad_casilla=="gana estrella"){
            jugador.estrellas+=1
        }
        if (actividad_casilla=="minijuego"){
            let lista = [1,2,3]
            let numero_respuesta = lista[getRandomInt(0, lista.length - 1)]
            let nombre_minijuego = minijuegos[numero_respuesta]
            informacion_relevante["minijuego"]=nombre_minijuego
        }
        jugador.posicion = actual_posicion%16;
        await jugador.save();

        
        let llave_posicion = posicion.toString();
        informacion_relevante["actual_posicion"] = posicion_casilla
        informacion_relevante["actividad_casilla"] = actividad_casilla

        ctx.body = [jugador, informacion_relevante];
        ctx.status = 201;
    } catch (error) {
        ctx.body = error;
        ctx.status = 404;
    }
})
module.exports = router;