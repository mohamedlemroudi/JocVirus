import {Baralla} from './Baralla.js';
import {Jugador} from './Jugador.js';
import Controller from "../controller/Controller.js";

export class Joc {
    constructor(numJugadors){
        //this.controller = new Controller();
        //this.controller.iniciar();
        this.finalitzat=false;
        this.barallaGeneral = new Baralla();
        this.barallaGeneral.generarSencera();
        this.jugadors = new Array(numJugadors);

        for (let i = 0; i<numJugadors; i++) {
            this.jugadors[i] = new Jugador();
        }
    }

    getCarta(jugador, pos) {
        let carta = this.barallaGeneral.treureCartaRandom();
        this.jugadors[jugador].baralla.afegirCartaPos(carta, pos);
        return carta;
    }

    /**
     * Emplenar 3 cartes
     * @param {int} i
     */
    emplenar3Baralla(i) {
        let barallaJudador = {
            "carta-1" : null,
            "carta-2" : null,
            "carta-3" : null
        }
        //const numCartes = this.jugadors[i].baralla.cartes.length;
        if (this.jugadors[i].baralla.cartes[0] === null) {
            let carta = this.barallaGeneral.treureCartaRandom();
            this.jugadors[i].baralla.afegirCartaPos(carta, 0);
            //this.controller.crearCarta(carta, "carta-1");
            barallaJudador["carta-1"] = carta;
        }

        if (this.jugadors[i].baralla.cartes[1] === null) {
            let carta = this.barallaGeneral.treureCartaRandom();
            this.jugadors[i].baralla.afegirCartaPos(carta, 1);
            //this.controller.crearCarta(carta, "carta-2");
            barallaJudador["carta-2"] = carta;
        }

        if (this.jugadors[i].baralla.cartes[2] === null) {
            let carta = this.barallaGeneral.treureCartaRandom();
            this.jugadors[i].baralla.afegirCartaPos(carta, 2);
            //this.controller.crearCarta(carta, "carta-3");
            barallaJudador["carta-3"] = carta;
        }

        /*for (let i = 0; i<(3-numCartes); i++) {
            let carta = this.barallaGeneral.treureCartaRandom();
            this.jugadors[i].baralla.afegirCarta(carta);
            this.controller.crearCarta(carta, this.cartesBuides);
        }*/

        return barallaJudador;
    }
}
