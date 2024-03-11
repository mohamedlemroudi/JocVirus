import Controller from "../controller/Controller.js";
import Vista from "./Vista.js";

export class DragDrop {
    // Variable para almacenar la carta seleccionada
    cartaSeleccionada = null;
    //controller = new Controller();
    constructor(callback) {
        this.carta1 = document.querySelector('.jugador-1 .cartes .carta-1');
        this.carta2 = document.querySelector('.jugador-1 .cartes .carta-2');
        this.carta3 = document.querySelector('.jugador-1 .cartes .carta-3');
        this.carta4 = document.querySelector('.jugador-2 .cartes .carta-4');
        this.carta5 = document.querySelector('.jugador-2 .cartes .carta-5');
        this.carta6 = document.querySelector('.jugador-2 .cartes .carta-6');
        this.listaCartes = [this.carta1, this.carta2, this.carta3,
        this.carta4, this.carta5, this.carta6];
        this.parts = document.querySelectorAll('.part-cos');
        this.zIndexCarta = 0;
        this.vista = new Vista();
        //this.torn = false;
        this.callback = callback;
    }

    moviment() {
        this.carta1 = document.querySelector('.jugador-1 .cartes .carta-1');
        this.carta2 = document.querySelector('.jugador-1 .cartes .carta-2');
        this.carta3 = document.querySelector('.jugador-1 .cartes .carta-3');
        this.carta4 = document.querySelector('.jugador-2 .cartes .carta-4');
        this.carta5 = document.querySelector('.jugador-2 .cartes .carta-5');
        this.carta6 = document.querySelector('.jugador-2 .cartes .carta-6');
        this.listaCartes = [this.carta1, this.carta2, this.carta3,
            this.carta4, this.carta5, this.carta6];

        if (this.carta1 === null || this.carta2 === null || this.carta3 === null
            || this.carta4 === null || this.carta5 === null || this.carta6 === null) {
            console.log('Has eliminar algú carta tens que canvia de torn si vols posar alguna carta en algun cos.');
        } else {
            this.listaCartes.forEach((carta) => {
                carta.addEventListener('mousedown', () => {
                    console.log('Holi');
                    if (carta.dataset.moure === "true") {

                        let jugadorEnPartida = '', jugadorEnEspera = '';

                        if (carta.classList.contains('jugador1')) {
                            jugadorEnPartida = "cos-jugador1";
                            jugadorEnEspera = "cos-jugador2";
                        } else {
                            jugadorEnPartida = "cos-jugador2";
                            jugadorEnEspera = "cos-jugador1";
                        }

                        this.deixarCarta(carta);
                        this.parts.forEach((part) => {
                            if (part.dataset.informacio === carta.dataset.categoria) {
                                if(carta.dataset.tipus === "organ"  && part.dataset.cos === jugadorEnPartida) {
                                    part.classList.add("hovered");
                                }
                                else if (carta.dataset.tipus === "virus" && part.dataset.cos === jugadorEnEspera &&
                                    1 < part.childElementCount && part.childElementCount < 4) {
                                    part.classList.add("hovered");
                                }
                                else if(carta.dataset.tipus === "medicina"  && part.dataset.cos === jugadorEnPartida &&
                                    1 < part.childElementCount && part.childElementCount < 4) {
                                    part.classList.add("hovered");
                                }
                            }
                        });
                    }
                });

                carta.addEventListener('dragend', () => {
                    this.parts.forEach((part) => {
                        part.classList.remove("hovered");
                    });
                });
            })
        }
    }

    deixarCarta(carta) {
        this.cartaSeleccionada = carta;
    }

    seleccionarCarta() {
        this.parts.forEach((part) => {
            part.addEventListener("drop", (event) => {
                event.preventDefault();
                let permetre = false;
                let jugadorEnPartida = '', jugadorEnEspera = '';

                if (this.cartaSeleccionada !== null) {
                    if (this.cartaSeleccionada.classList.contains('jugador1')) {
                        jugadorEnPartida = "cos-jugador1";
                        jugadorEnEspera = "cos-jugador2";
                    } else {
                        jugadorEnPartida = "cos-jugador2";
                        jugadorEnEspera = "cos-jugador1";
                    }

                    this.moviment();

                    if (part.childElementCount < 2 && this.cartaSeleccionada.dataset.tipus === "organ"
                        && part.dataset.cos === jugadorEnPartida) {
                        permetre = true;
                    } else if(1 < part.childElementCount && part.childElementCount < 4 && this.cartaSeleccionada.dataset.tipus === "medicina" &&
                        part.dataset.cos === jugadorEnPartida) {
                        permetre = true;
                    } else if(1 < part.childElementCount && part.childElementCount < 4 && this.cartaSeleccionada.dataset.tipus === "virus" &&
                        part.dataset.cos === jugadorEnEspera) {
                        permetre = true;
                    }

                    if (permetre && this.cartaSeleccionada && this.cartaSeleccionada.dataset.categoria === part.dataset.informacio
                        && this.cartaSeleccionada.dataset.moure === "true") {

                        const ultimaCarta = part.children[part.children.length - 1];
                        const img = part.children[0];

                        if (ultimaCarta.dataset.tipus === "medicina" && this.cartaSeleccionada.dataset.tipus === 'medicina'
                            && part.dataset.immuno === "false") {
                            while (part.lastChild !== img) {
                                part.removeChild(part.lastChild);
                            }
                            part.style.background = `conic-gradient(
                                                    from -90deg,
                                                    #A0CBF1FF,
                                                    #EF857CFF 25%,
                                                    #97D3B1FF 50%,
                                                    #EFE1AAFF 75%,
                                                    #EFE1AAFF 100%,
                                                    #A0CBF1FF
                                            ) rgba(35, 35, 35, 0.89)`;
                            part.dataset.completat = "true";
                            part.dataset.immuno = "true";
                        } else if(ultimaCarta.dataset.tipus === "virus" && this.cartaSeleccionada.dataset.tipus === "virus") {
                            while (part.lastChild !== img) {
                                part.removeChild(part.lastChild);
                            }
                            part.dataset.completat = "false";
                        } else if((ultimaCarta.dataset.tipus === "virus" && this.cartaSeleccionada.dataset.tipus === "medicina")
                            || (ultimaCarta.dataset.tipus === "medicina" && this.cartaSeleccionada.dataset.tipus === "virus")) {
                            part.removeChild(part.lastChild);
                            part.dataset.completat = "true";
                        } else {
                            this.marginCartaTop = (part.childElementCount-1) * 50;
                            this.marginCartaLeft = (part.childElementCount-1) * -10;
                            this.zIndexCarta += (part.childElementCount-1) * 10;
                            part.appendChild(this.cartaSeleccionada);
                            this.cartaSeleccionada.classList.add('carta-sobre-cos');
                            this.cartaSeleccionada.classList.remove('carta-efecto-3d');
                            this.cartaSeleccionada.classList.remove('descartar');
                            this.cartaSeleccionada.style.zIndex = this.zIndexCarta;
                            this.cartaSeleccionada.style.marginTop = this.marginCartaTop + "px";
                            this.cartaSeleccionada.style.marginLeft = this.marginCartaLeft + "px";
                            this.cartaSeleccionada.dataset.moure = "false";
                            if (this.cartaSeleccionada.dataset.tipus === "virus") {
                                this.cartaSeleccionada.dataset.completat = "false";
                            }
                            else {
                                this.cartaSeleccionada.dataset.completat = "true";
                            }
                            this.cartaSeleccionada = null;
                        }

                        this.callback();
                        if (jugadorEnPartida === "cos-jugador1") {
                            this.vista.canviTorn(false);
                        } else {
                            this.vista.canviTorn(true);
                        }
                    }
                }
            });

            // Permite que las partes acepten elementos arrastrados
            part.addEventListener("dragover", (event) => {
                event.preventDefault();
            });
        });
    }
}


