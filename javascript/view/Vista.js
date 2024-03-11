import {DragDrop} from "./DragDrop.js";
import Controller from "../controller/Controller.js";

export default class Vista {

    constructor() {
        this.canviTornHandle = null;
        this.controller = new Controller();
        this.permetre = true;
    }

    bindCanviTorn(handle) {
        this.canviTornHandle = handle
    }

    start() {
        document.addEventListener("DOMContentLoaded", () => {
            // Intro del joc
            /*setTimeout(function(){
                document.querySelector(".anunci").classList.add("ocultar");
                document.querySelector(".cos-jugador1").style.opacity = '1';
                document.querySelector(".cos-jugador2").style.opacity = '1';
                document.querySelector(".jugador-1").style.opacity = '1';
                document.querySelector(".jugador-2").style.opacity = '1';
            }, 3000);*/
            document.querySelector(".anunci").classList.add("ocultar");
            document.querySelector(".cos-jugador1").style.opacity = '1';
            document.querySelector(".cos-jugador2").style.opacity = '1';
            document.querySelector(".jugador-1").style.opacity = '1';
            document.querySelector(".jugador-2").style.opacity = '1';
        });
    }

    crearCartes(carta, pos, propietari) {
        if (carta !== undefined) {
            this.crearCarta = `<div class="carta ${pos} carta-efecto-3d ${propietari}" draggable="true" data-categoria = "${carta.getColor()}" data-tipus = "${carta.getTipus()}" data-moure="true">
                    <i class="${carta.getIconaEsquina()} primer-icona"></i>
                    <div class="carta-border">
                        <img class="icona-carta" src="${carta.getIconaCarta()}" draggable="false">
                        <img class="icona-carta2" src="${carta.getIconaCarta3D()}" draggable="false">
                    </div>
                    <i class="${carta.getIconaEsquina()} segon-icona"></i>
                    <div class="descartar"><i class="fas fa-window-close"></i></div>
                </div>`;

            if (pos === "carta-1" || pos === "carta-2" || pos === "carta-3") {
                let jugador1 = document.querySelector('.jugador-1');
                jugador1.querySelector('.cartes').innerHTML += this.crearCarta;
            } else {
                let jugador2 = document.querySelector('.jugador-2');
                jugador2.querySelector('.cartes').innerHTML += this.crearCarta;
            }
        }
    }

    canviTorn(torn) {
        this.listaCartes1 = document.querySelectorAll(".jugador-1 .cartes .carta");
        this.listaCartesOcultes1 = document.querySelectorAll(".jugador-1 .cartes .carta-oculta");
        this.listaCartes2 = document.querySelectorAll(".jugador-2 .cartes .carta");
        this.listaCartesOcultes2 = document.querySelectorAll(".jugador-2 .cartes .carta-oculta");
        this.finalitzar = this.controller.finalitzarPartida(torn);
        if (!this.finalitzar) {
            if (torn) {
                this.listaCartes1.forEach((carta) => {
                    carta.dataset.moure = "true";
                    carta.classList.add('carta-efecto-3d');
                    carta.classList.add('descartar');
                    carta.style.display = "block";
                    carta.setAttribute("draggable", "true");
                });

                this.listaCartesOcultes1.forEach((cartaOculta) => {
                    cartaOculta.style.display = "none";
                });

                this.listaCartes2.forEach((carta) => {
                    carta.dataset.moure = "false";
                    carta.classList.remove('carta-efecto-3d');
                    carta.classList.remove('descartar');
                    carta.style.display = "none";
                    carta.setAttribute("draggable", "false");
                });

                this.listaCartesOcultes2.forEach((cartaOculta) => {
                    cartaOculta.style.display = "block";
                });
            } else {
                this.listaCartes1.forEach((carta) => {
                    carta.dataset.moure = "false";
                    carta.classList.remove('carta-efecto-3d');
                    carta.classList.remove('descartar');
                    carta.style.display = "none";
                    carta.setAttribute("draggable", "false");
                });

                this.listaCartesOcultes1.forEach((cartaOculta) => {
                    cartaOculta.style.display = "block";
                });

                this.listaCartes2.forEach((carta) => {
                    carta.dataset.moure = "true";
                    carta.classList.add('carta-efecto-3d');
                    carta.classList.add('descartar');
                    carta.style.display = "block";
                    carta.setAttribute("draggable", "true");
                });

                this.listaCartesOcultes2.forEach((cartaOculta) => {
                    cartaOculta.style.display = "none";
                })
            }
            this.controller.emplenarCartes();
            this.removeCard();
        } else {
            this.listaCartes1.forEach((carta) => {
                carta.style.display = "none";
            });

            this.listaCartes2.forEach((carta) => {
                carta.style.display = "none";
            });
            console.log('finalitzat');
        }
    }

    dragDrop() {
        const drag = new DragDrop(this.canviTornHandle);
        drag.moviment();
        drag.seleccionarCarta();

    }

    removeCard() {
        const cartes = document.querySelectorAll('.cartes .carta');

        cartes.forEach((carta) => {
            const descartarBtn = carta.querySelector('.descartar');

            descartarBtn.onclick = () => {
                const parts = document.querySelectorAll('.part-cos');
                let btnCanviTorn = null;
                let torn = false;
                if (carta.classList.contains('jugador1')) {
                    btnCanviTorn = document.querySelector('.canviar_torn');
                    torn = true;
                } else {
                    btnCanviTorn = document.querySelector('.canviar_torn2');
                    torn = false;
                }

                btnCanviTorn.style.display = "none";
                carta.classList.add('fall');

                //carta.remove();
                //this.canviTorn(false);
                this.aceptarDescart(torn);


                setTimeout(() => {
                    carta.remove();
                    btnCanviTorn.style.display = "block";
                    //this.canviTorn(false);
                    this.aceptarDescart(torn);
                }, 500);

                parts.forEach((part) => {
                    part.classList.remove('hovered');
                });
            };
        });
    }

    aceptarDescart(torn) {
        if (torn) {
            const btnCanviTorn = document.querySelector('.canviar_torn');
            btnCanviTorn.addEventListener('click', () => {
                btnCanviTorn.style.display = "none";
                this.permetre = true;
                this.canviTorn(false);
            });
        } else {
            const btnCanviTorn2 = document.querySelector('.canviar_torn2');
            btnCanviTorn2.addEventListener('click', () => {
                this.permetre = true;
                btnCanviTorn2.style.display = "none";
                this.canviTorn(true);
            });
        }
    }
}
