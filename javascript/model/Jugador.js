import {Baralla} from './Baralla.js';

export class Jugador{
    static idJugadors=0;

    constructor() {
        this.id = Jugador.idJugadors++;
        this.baralla = new Baralla();
        this.cos = new Baralla();
        this.torn = false;
        this.estatCor = 0;
        this.estatEsquelet = 0;
        this.estatFetge = 0;
        this.estatCervell = 0;
    }
}
