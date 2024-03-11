export class Carta {
    color = "";
    iconaCarta = "";
    iconaCarta3D = "";
    iconaEsquina = "";
    tipus = ""; //organ -> +2 || virus -> -1 || medicina -> +1
    valor = 0;

    constructor(color, iconaCarta, iconaCarta3D, iconaEsquina, valor, tipus) {
        this.color = color;
        this.iconaCarta = iconaCarta;
        this.iconaCarta3D = iconaCarta3D;
        this.iconaEsquina = iconaEsquina;
        this.valor = valor;
        this.tipus = tipus;
    }

    getColor() {
        return this.color;
    }

    getIconaCarta() {
        return this.iconaCarta;
    }

    getIconaCarta3D() {
        return this.iconaCarta3D;
    }

    getIconaEsquina() {
        return this.iconaEsquina;
    }

    getTipus() {
        return this.tipus;
    }

    getValor() {
        return this.valor;
    }
}
