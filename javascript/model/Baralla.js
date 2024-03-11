import {Carta} from './Carta.js';

export class Baralla {
    constructor() {
        this.cartes=[null, null, null];
    }
    
    generarSencera() {
        const colors = ['vermell', 'blau', 'vert', 'groc'];
        const iconesEsquina = [
            'far fa-heart',
            'fas fa-capsules',
            'fas fa-virus'
        ];
        const iconesCartesOrgans = [
            "../../img/cor.png",
            "../../img/cervell.png",
            "../../img/fetge.png",
            "../../img/os.png"
        ];
        const iconesCartesMedicina = [
            "../../img/medicina-cor.png",
            "../../img/medicina-cervell.png",
            "../../img/medicina-fetge.png",
            "../../img/medicina-os.png"
        ];
        const iconesCartesVirus = [
            "../../img/virus-cor.png",
            "../../img/virus-cervell.png",
            "../../img/virus-fetge.png",
            "../../img/virus-os.png"
        ];
        // Cartes 3D
        const iconesCartesOrgans3D = [
            "./../img/cor2.png",
            "./../img/cervell2.png",
            "./../img/fetge2.png",
            "./../img/os2.png"
        ];
        const iconesCartesMedicina3D = [
            "../../img/medicina-cor2.png",
            "../../img/medicina-cervell2.png",
            "../../img/medicina-fetge2.png",
            "../../img/medicina-os2.png"
        ];
        const iconesCartesVirus3D = [
            "../../img/virus-cor2.png",
            "../../img/virus-cervell2.png",
            "../../img/virus-fetge2.png",
            "../../img/virus-os2.png"
        ];

        let j=0;
        let pos = 0;
        for (const color of colors) {
            for (let i=j; i<5+j; i++) {
                this.cartes[i] = new Carta(color, iconesCartesOrgans[pos], iconesCartesOrgans3D[pos], iconesEsquina[0],2, "organ");
            }
            for (let i=j; i<4+j; i++) {
                this.cartes[9+i] = new Carta(color, iconesCartesMedicina[pos], iconesCartesMedicina3D[pos],  iconesEsquina[1], 1, "medicina");
                this.cartes[5+i] = new Carta(color, iconesCartesVirus[pos], iconesCartesVirus3D[pos],  iconesEsquina[2], -1, "virus");
            }
            j+=13;
            pos++;
        }
    }
    /**
     * afegir carta
     * @param {Carta} carta
     */
    afegirCarta(carta) {
        this.cartes[this.cartes.length]=carta;
    }

    afegirCartaPos(carta, pos) {
        this.cartes[pos]=carta;
    }

    treureCartaRandom() {
        /** Extreure carta aleatòria  **/
        const pos=Math.trunc(Math.random()*this.cartes.length);
        const carta=this.cartes[pos];
        /** Eliminar carta del grup**/
        this.cartes.splice(pos, 1);
        return carta;
    }
}
