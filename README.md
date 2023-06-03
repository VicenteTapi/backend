# grupo-Grupo-113-backend



## Acerca del ambiente de desarrollo


### Documentación de los metodos asociados a los metodos de los archivos dado.js y versus.js

1. Usar el metodo lanzar dado.
	* Desde postman probar en http://localhost:3000/dado/lanzar :
	- La forma de probar los ejemplos en enviando un json de la siguiente forma:
	```
	{
        "jugadorId": 1,
        "tipo_de_dado": "dadoNormal"
    }
	```
    * Se recomiendo probar con los tres tipos de dados que son :   "dadoChico",
  "dadoGrande" y "dadoNormal"
2. Usar metodo post de crear un Versus

	Para usar este metodo se debe probar en http://localhost:3000/versus/crear se debe hacer un POST con el siguiente json:
	```
	{"jugadorId":3,"partidaId":1, "minijuego": 1}
	```
    Si previamente de habían crado 3 jugadores que se unieron a la partida 1, lo que hace este post es que cuando a un jugador le toca el minijuego 1, hace un post para crear un versus de ese juego con los demas jugadores de la partida, por lo que si hay 3 jugadores en la partida, se crean 3 filas en la tabla versus y a esas 3 filas que representan a cada uno de los jugadores se les inicializa con un score = 0
3. Usar metodo post para jugar un Versus
    
    Para usar este metodo se debe probar en http://localhost:3000/versus/jugar se debe hacer un POST con el siguiente json:
	```
	{"jugadorId":3,"partidaId":1, "minijuego": 1}
	```
    Con este ejemplo, el jugador de id 3 decide juagar el versus del minijuego 1, si sólo el ja jugado al hacer el post sólo se nos devuelve un 202
    de aceptado, cuando todos los jugadores de la partida ham jugado el minijuego se nos devuelve el siguiente json
    ```
	 {
        "1": 3,
        "2": 8,
        "3": 5,
        "ganador": 2
        }
	```
    En este caso se nos informa que el jugador de id 2 ha ganado el versus, en este ejemplo en la partida hay 3 jugadores