import Vista from "../view/Vista.js";
import {Joc} from "../model/Joc.js";

export default class Controller {
    constructor() {
        this.joc = new Joc(2);
    }

    iniciar() {
        console.log("Iniciant joc");
        this.vista = new Vista();
        this.vista.bindCanviTorn(()=>{this.torn()});
        this.vista.start();
        this.emplenarCartes();
        this.vista.canviTorn(true);
        this.vista.dragDrop();
        this.removeCard();
    }

    emplenarCartes() {
        let carta1 = document.querySelector('.jugador-1 .cartes .carta-1');
        let carta2 = document.querySelector('.jugador-1 .cartes .carta-2');
        let carta3 = document.querySelector('.jugador-1 .cartes .carta-3');
        let carta4 = document.querySelector('.jugador-2 .cartes .carta-4');
        let carta5 = document.querySelector('.jugador-2 .cartes .carta-5');
        let carta6 = document.querySelector('.jugador-2 .cartes .carta-6');

        if (carta1 === null) {
            this.crearCarta(this.joc.getCarta(0, 0), "carta-1", "jugador1");
        }
        if (carta2 === null) {
            this.crearCarta(this.joc.getCarta(0, 1), "carta-2", "jugador1");
        }
        if (carta3 === null) {
            this.crearCarta(this.joc.getCarta(0, 2), "carta-3", "jugador1");
        }
        if (carta4 === null) {
            this.crearCarta(this.joc.getCarta(1, 0), "carta-4", "jugador2");
        }
        if (carta5 === null) {
            this.crearCarta(this.joc.getCarta(1, 1), "carta-5", "jugador2");
        }
        if (carta6 === null) {
            this.crearCarta(this.joc.getCarta(1, 2), "carta-6", "jugador2");
        }
    }

    torn() {
        this.emplenarCartes();
    }

    crearCarta(carta, pos, propietari) {
        if (this.vista == null) {
            this.vista = new Vista();
        }
        this.vista.crearCartes(carta, pos, propietari);
    }

    removeCard() {
        this.vista.removeCard();
    }

    finalitzarPartida(torn) {
        if (!this.joc.finalitzat) {
            let parts = null;
            if (torn) {
                parts = document.querySelectorAll('.cos-jugador1 .part-cos');
            } else {
                parts = document.querySelectorAll('.cos-jugador2 .part-cos');
            }
            console.log(torn);
            this.joc.finalitzat = true;
            parts.forEach((part) => {
                if (part.dataset.completat !== "true" && part.dataset.immuno !== "true") {
                    this.joc.finalitzat = false;
                }
            });
        }
        return this.joc.finalitzat;
    }
}
